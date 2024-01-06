import { Injectable } from '@angular/core';
import { Chess } from 'chess.js';
import {
  ChessWebsiteApiService,
  PuzzleResponse,
} from './chess-website-api.service';
import { Chessground } from 'chessground';
import { Move } from './move';

@Injectable({
  providedIn: 'root',
})
export class PuzzleService {
  groundboard: any | undefined;
  game: Chess = new Chess();
  solution: string[] = [];
  element: HTMLElement | undefined | null;

  constructor(public api: ChessWebsiteApiService) {}

  loadPuzzle(element: HTMLElement | null = null): void {
    this.element ||= element;
    const promise = this.api.fetchChessPuzzle();
    promise.subscribe((response: any) => {
      this.setGameFromResponse(response);
    });
  }

  lastMoveOfGame() {
    return this.game.history({
      verbose: true,
    })[this.game.history().length - 1];
  }

  constructConfig() {
    const orientation: 'white' | 'black' =
      this.game.turn() == 'w' ? 'white' : 'black';
    const lastMove = this.lastMoveOfGame();

    return {
      coordinates: false,
      orientation,
      fen: this.game.fen(),
      viewOnly: true,
      lastMove: lastMove ? [lastMove.from, lastMove.to] : undefined,
    };
  }

  initiateGame(response: PuzzleResponse): void {
    // Set Game
    this.game.loadPgn(response.gamePgn);
    console.log(this.game.ascii());

    const config = this.constructConfig();
    // Set Digital Board
    if (this.element) {
      this.groundboard = Chessground(this.element, config);
    }
  }

  setGameFromResponse(response: PuzzleResponse): void {
    this.initiateGame(response);
    this.solution = [...response.puzzleSolution] || [];
    console.log(this.solution);
  }

  setMoveClickCallback() {}

  makeOpponentMove(): void {
    const move = this.solution.shift();
    if (move) {
      const m = this.game.move(move);
      this.groundboard.set({
        fen: this.game.fen(),
        lastMove: [m.from, m.to],
      });
    } else {
      console.log('FINISHED');
      setTimeout(() => this.loadPuzzle(), 2000);
    }
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
        this.groundboard.set({
          fen: this.game.fen(),
          lastMove: [gameMove.from, gameMove.to],
        });
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
}
