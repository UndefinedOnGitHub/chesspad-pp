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
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

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
  ) {}

  loadPuzzle(element: HTMLElement | null = null): void {
    if (element) {
      this.element = element;
    }
    const promise = this.api.fetchChessPuzzle();
    promise.subscribe((response: PuzzleResponse) => {
      this.setGameFromResponse(response);
    });
  }

  constructConfig() {
    const orientation: 'white' | 'black' =
      this.game.turn() == 'w' ? 'white' : 'black';

    return {
      coordinates: false,
      orientation,
      fen: this.game.fen(),
      viewOnly: true,
    };
  }

  initiateGame(response: PuzzleResponse): void {
    // Set Game
    this.game.loadPgn(response.gamePgn);
    this.boardOrientation = response.orientation;
    this.solution = [...response.puzzleSolution] || [];

    const config = this.constructConfig();
    // Set Digital Board
    if (this.element) {
      this.groundboard = Chessground(this.element, config);
    }
  }

  setGameFromResponse(response: PuzzleResponse): void {
    this.initiateGame(response);
    console.log(this.game.ascii());
    console.log(this.solution);
  }

  setMoveClickCallback() {}

  makeOpponentMove(): void {
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
      this.finishGame();
    }
  }

  finishGame(): void {
    this.dialog
      .open(FinishGameDialogComponent, {
        data: { pgn: this.game.pgn(), disabled: true },
      })
      .afterClosed()
      .subscribe(() => {
        console.log('FINISHED');
        this.loadPuzzle();
      });
  }

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
        setTimeout(() => this.makeOpponentMove(), 500);
        return { sucess: true };
      }

      return { sucess: false };
    } catch (err) {
      return { sucess: false };
    }
  }

  getAdditionalButton() {
    return this.additionalButton;
  }
}
