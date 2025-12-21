import { Injectable } from '@angular/core';
import { Chess } from 'chess.js';
import {
  ChessWebsiteApiService,
  GameResponse,
} from './chess-website-api.service';
import { Chessground } from 'chessground';
import { Move } from '../keyboards/models/move';
import { MatDialog } from '@angular/material/dialog';
import {
  GameReviewSelectorDialogComponent,
  DialogCloseResponse,
} from '@components/game-review-selector-dialog/game-review-selector-dialog.component';
import { KeyboardButton } from '../keyboards/models/button';
import { GameStorageManagerService } from './game-storage-manager.service';
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { FinishGameDialogComponent } from '../components/finish-game-dialog/finish-game-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class GameReviewService {
  groundboard: any | undefined;
  game: Chess = new Chess();
  element: HTMLElement | undefined | null;
  history: string[] = [];
  currentMove: string | undefined | null;
  additionalButton: KeyboardButton = new KeyboardButton({
    key: 'switch_keyboard',
    icon: faNotesMedical,
    symbol: '',
    onTrigger: () => {
      this.#newGamePopup();
    },
  });

  constructor(
    public api: ChessWebsiteApiService,
    public dialog: MatDialog,
    public storage: GameStorageManagerService,
  ) {}

  getAdditionalButton() {
    return this.additionalButton;
  }

  init(element: HTMLElement | null = null): void {
    return this.#loadGame(element);
  }

  // Not in use. May be needed if board loading takes a long time.
  // startBoardLoading(
  //   board: ReturnType<typeof Chessground>,
  // ): ReturnType<typeof setTimeout> {
  //   let peices = [
  //     ['c4', null, 'white'],
  //     ['d4', null, 'white'],
  //     ['e4', null, 'white'],
  //     ['f4', null, 'white'],
  //   ];
  //   return setInterval(() => {
  //     const [position, peice, color] = peices.shift() || [];
  //     if (peice) {
  //       this.groundboard.setPieces([[position, { role: peice, color: color }]]);
  //       peices.push([position, null, color == 'black' ? 'white' : 'black']);
  //     } else {
  //       this.groundboard.setPieces([[position, null]]);
  //       peices.push([position, 'king', color]);
  //     }
  //   }, 200);
  // }

  #newGamePopup() {
    const dialogRef = this.dialog.open(GameReviewSelectorDialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: DialogCloseResponse) => {
      if (result) {
        this.#fetchAndLoadGame(result);
      }
    });
  }

  #loadGame(element: HTMLElement | null = null): void {
    if (element) {
      this.element = element;
      this.groundboard = Chessground(this.element, {
        coordinates: false,
        viewOnly: true,
      });
      this.game = new Chess();
    }
    const game = this.storage.fetchGame('local_game_review');
    if (game) {
      const moveNumber =
        parseInt(this.storage.fetch('local_game_review_move_number') || '0') ||
        0;
      const history = game.history().slice(moveNumber);
      game
        .history()
        .slice(0, moveNumber)
        .forEach((m) => this.game.move(m));
      const orientation =
        this.storage.fetch('local_game_review_orientation') == 'b' ? 'b' : 'w';

      this.#initiateGame({ history, orientation, gamePgn: game.pgn() });
      this.#scrollToLastMove();
    } else {
      this.#newGamePopup();
    }
  }

  #fetchAndLoadGame(result: DialogCloseResponse): void {
    if (this.element) {
      this.groundboard = Chessground(this.element, {
        coordinates: false,
        viewOnly: true,
      });
    }
    this.game = new Chess();
    const promise = this.api.fetchChessGame(result.username, result.color);
    promise.subscribe((response: GameResponse) => {
      this.#setGameFromResponse(response);
    });
  }

  #constructConfig(response: GameResponse, firstMove: any) {
    const orientation: 'white' | 'black' =
      response.orientation == 'w' ? 'white' : 'black';

    return {
      coordinates: false,
      orientation,
      fen: this.game.fen(),
      viewOnly: true,
      lastMove: [firstMove.from, firstMove.to],
    };
  }

  #storeGame(response: GameResponse) {
    const storageGame = new Chess();
    storageGame.loadPgn(response.gamePgn);
    this.storage.storeGame('local_game_review', storageGame);
    this.storage.store('local_game_review_move_number', '0');
    this.storage.store('local_game_review_orientation', response.orientation);
  }

  #initiateGame(response: GameResponse): void {
    // Set Game
    this.history = response.history;
    this.currentMove = this.history.shift();
    if (this.currentMove) {
      const firstMove = this.game.move(this.currentMove);
      const config = this.#constructConfig(response, firstMove);
      // Set Digital Board
      if (this.element) {
        this.groundboard = Chessground(this.element, config);
      }
    }

    // Log Game
    console.log(this.game.ascii());
    console.log(this.history);
  }

  #setGameFromResponse(response: GameResponse): void {
    // Store Game
    this.#storeGame(response);
    // Start Game
    this.#initiateGame(response);
  }

  setMoveClickCallback() {}

  #finishGame() {
    this.dialog
      .open(FinishGameDialogComponent, {
        data: { pgn: this.game.pgn(), disabled: true, game: this.game },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result.new) {
          this.#newGamePopup();
        }
      });
  }

  makeMove(move: Move): { success: boolean } {
    if (
      this.currentMove?.replace('+', '')?.replace('x', '').replace('#', '') ==
      String(move)?.replace('x', '')
    ) {
      this.currentMove = this.history.shift();
      setTimeout(() => {
        if (this.currentMove) {
          const gameMove = this.game.move(this.currentMove);
          this.storage.store(
            'local_game_review_move_number',
            String(this.game.history().length - 1),
          );
          this.groundboard.set({
            fen: this.game.fen(),
            lastMove: [gameMove.from, gameMove.to],
          });
        } else {
          this.#finishGame();
        }
      }, 500);
      this.#scrollToLastMove();
      return { success: true };
    }
    return { success: false };
  }

  isCheckmate(): boolean {
    return this.game.isCheckmate();
  }

  #scrollToLastMove(): void {
    // Scroll to last move
    // Keep slight delay to force the render of the move before animation
    try {
      setTimeout(() => {
        const dispays = document.getElementsByClassName(
          'display-results-move-row',
        );
        const e = dispays[dispays.length - 1];
        e?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch {
      // Prevent from issues here causeing bigger problems
    }
  }
}
