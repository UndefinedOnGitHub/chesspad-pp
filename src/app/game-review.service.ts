import { Injectable } from '@angular/core';
import { Chess } from 'chess.js';
import {
  ChessWebsiteApiService,
  GameResponse,
} from './chess-website-api.service';
import { Chessground } from 'chessground';
import { Move } from './move';
import { MatDialog } from '@angular/material/dialog';
import {
  GameReviewSelectorDialogComponent,
  DialogCloseResponse,
} from './game-review-selector-dialog/game-review-selector-dialog.component';
import { KeyboardButton } from './button';
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons';

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
      this.loadGame();
    },
  });

  constructor(
    public api: ChessWebsiteApiService,
    public dialog: MatDialog,
  ) {}

  getAdditionalButton() {
    return this.additionalButton;
  }

  // Not in use. May be needed if board loading takes a long time.
  startBoardLoading(
    board: ReturnType<typeof Chessground>,
  ): ReturnType<typeof setTimeout> {
    let peices = [
      ['c4', null, 'white'],
      ['d4', null, 'white'],
      ['e4', null, 'white'],
      ['f4', null, 'white'],
    ];
    return setInterval(() => {
      const [position, peice, color] = peices.shift() || [];
      if (peice) {
        this.groundboard.setPieces([[position, { role: peice, color: color }]]);
        peices.push([position, null, color == 'black' ? 'white' : 'black']);
      } else {
        this.groundboard.setPieces([[position, null]]);
        peices.push([position, 'king', color]);
      }
    }, 200);
  }

  loadGame(element: HTMLElement | null = null): void {
    if (element) {
      this.element = element;
      this.groundboard = Chessground(this.element, {
        coordinates: false,
        viewOnly: true,
      });
    }
    const dialogRef = this.dialog.open(GameReviewSelectorDialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: DialogCloseResponse) => {
      if (result) {
        if (this.element) {
          this.groundboard = Chessground(this.element, {
            coordinates: false,
            viewOnly: true,
          });
        }
        this.game = new Chess();
        const promise = this.api.fetchChessGame(result.username, result.color);
        promise.subscribe((response: GameResponse) => {
          this.setGameFromResponse(response);
        });
      }
    });
  }

  constructConfig(response: GameResponse, firstMove: any) {
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

  initiateGame(response: GameResponse): void {
    // Set Game
    console.log(this.game.ascii());
    this.history = response.history;
    console.log(this.history);
    this.currentMove = this.history.shift();
    if (this.currentMove) {
      const firstMove = this.game.move(this.currentMove);
      const config = this.constructConfig(response, firstMove);
      // Set Digital Board
      if (this.element) {
        this.groundboard = Chessground(this.element, config);
      }
    }
  }

  setGameFromResponse(response: GameResponse): void {
    this.initiateGame(response);
  }

  setMoveClickCallback() {}

  makeMove(move: Move): { sucess: boolean } {
    if (this.currentMove?.replace('+', '') == String(move)) {
      this.currentMove = this.history.shift();
      setTimeout(() => {
        if (this.currentMove) {
          const gameMove = this.game.move(this.currentMove);
          this.groundboard.set({
            fen: this.game.fen(),
            lastMove: [gameMove.from, gameMove.to],
          });
        }
      }, 500);
      this.#scrollToLastMove();
      return { sucess: true };
    }
    return { sucess: false };
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
