import { Injectable } from '@angular/core';
import { Chess } from 'chess.js';
import {
  ChessWebsiteApiService,
  PuzzleResponse,
} from './chess-website-api.service';
import { Chessground } from 'chessground';
import { Move } from './move';
import { FinishGameDialogComponent } from './finish-game-dialog/finish-game-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { KeyboardButton } from './button';
import { ChessgroundConfig } from './constants';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { GameStorageManagerService } from './game-storage-manager.service';

/**
 *
 * The Puzzle Service
 *
 * This service keeps track of the chess puzzle.
 * 
 * `init` will connect the board, keyboard and initiate the process
 *
 *
 */

@Injectable({
  providedIn: 'root',
})
export class PuzzleService {
  groundboard: ReturnType<typeof Chessground> | undefined;
  game: Chess = new Chess();
  solution: string[] = [];
  element: HTMLElement | undefined | null;
  boardOrientation: string | undefined;
  additionalButton: KeyboardButton = new KeyboardButton({
    key: 'switch_keyboard',
    icon: faLightbulb,
    symbol: '',
    onTrigger: () => {
      this.makeMove(new Move(this.solution[0]));
    },
  });

  constructor(
    public api: ChessWebsiteApiService,
    public dialog: MatDialog,
    public storage: GameStorageManagerService
  ) {}

  init(element: HTMLElement | null = null): void {
    return this.#loadPuzzle(element);
  }

  #loadPuzzle(element: HTMLElement | null = null): void {
    if (element) {
      this.element = element;
    }
    if (this.storage.isGameStored("local_puzzle")) {
      this.#fetchGame();
    } else {
      const promise = this.api.fetchChessPuzzle();
      promise.subscribe((response: PuzzleResponse) => {
        this.#initiateGame(response);
      });
    }
  }

  #storeGame() {
    const storageGame = new Chess(this.game.fen())
    this.solution.forEach((s: string) => storageGame.move(s))
    this.storage.storeGame('local_puzzle', storageGame)
  }

  #fetchGame() {
    const puzzle = this.storage.fetchGame('local_puzzle');
    if (puzzle) {
      const firstMove = puzzle.history({verbose: true})[0];
      this.game = new Chess(firstMove?.before);
      this.boardOrientation = firstMove.color;
      this.solution = [...puzzle.history()];
      this.#constructBoard();
    } else {
      this.storage.clearGame("local_puzzle");
    }
  }

  // Load Initial Values for the puzzle
  #initiateGame(response: PuzzleResponse): void {
    // Set Puzzle Variables
    this.game.loadPgn(response.gamePgn);
    this.boardOrientation = response.orientation;
    this.solution = [...response.puzzleSolution] || [];
    this.#storeGame();
    this.#constructBoard();
  }

  #constructBoard() {
    // Set Digital Board
    if (this.element) {
      const config = this.#constructConfig();
      this.groundboard = Chessground(this.element, config);
    }
    // Log Puzzle For Debugging
    console.log(this.game.ascii());
    console.log(this.solution);
  }

  // Construct configuration for chessground board
  #constructConfig(): ChessgroundConfig {
    const orientation: 'white' | 'black' =
      this.game.turn() == 'w' ? 'white' : 'black';

    return {
      coordinates: false,
      orientation,
      fen: this.game.fen(),
      viewOnly: true,
    };
  }

  // Left empty becuase no button to have clicked
  setMoveClickCallback() {}

  // Fuction to manage the opponents moves for the puzzle
  #makeOpponentMove(): void {
    const move = this.solution.shift();
    if (move) {
      const m = this.game.move(move);
      if (this.groundboard) {
        this.groundboard.set({
          fen: this.game.fen(),
          lastMove: [m.from, m.to],
        });
      }
    } else {
      this.#finishGame();
    }
  }

  // Finish Game Botton Action
  #finishGame(): void {
    this.dialog
      .open(FinishGameDialogComponent, {
        data: { pgn: this.game.pgn(), disabled: true, game: this.game },
      })
      .afterClosed()
      .subscribe(() => {
        console.log('FINISHED');
        this.storage.clearGame("local_puzzle");
        this.#loadPuzzle();
      });
  }

  // Move From Keyboard
  makeMove(move: Move): { sucess: boolean } {
    try {
      const [game1, game2] = [
        new Chess(this.game.fen()),
        new Chess(this.game.fen()),
      ];
      const gameMove = game1.move(move.toString());
      const solutionMove = game2.move(this.solution[0]);

      if (solutionMove.san == gameMove.san) {
        this.game.move(move.toString());
        if (this.groundboard) {
          this.groundboard.set({
            fen: this.game.fen(),
            lastMove: [gameMove.from, gameMove.to],
          });
        }
        // Remove move from solution
        this.solution.shift();
        // Wait then make opponent move
        setTimeout(() => this.#makeOpponentMove(), 500);
        return { sucess: true };
      }

      return { sucess: false };
    } catch (err) {
      return { sucess: false };
    }
  }

  // Provide the solution button to the keyboard
  getAdditionalButton() {
    return this.additionalButton;
  }

  isCheckmate() : boolean {
    return this.game.isCheckmate()
  }
}
