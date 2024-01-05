import { Injectable } from '@angular/core';
import { Chess } from 'chess.js';
import { HttpClient } from '@angular/common/http';
import { Chessground } from 'chessground';
import { Move } from './move';
import { map } from 'rxjs';

interface PuzzleResponse {
  gamePgn: string;
  puzzleSolution: string;
}

@Injectable({
  providedIn: 'root',
})
export class PuzzleService {
  groundboard: any | undefined;
  game: Chess = new Chess();
  solution: string[] = [];
  element: HTMLElement | undefined | null;

  constructor(public http: HttpClient) {}

  loadLichessPuzzle() {
    return this.http.get('https://lichess.org/api/puzzle/daily').pipe(
      map((response: any) => {
        console.log(response);
        return {
          gamePgn: response.game.pgn,
          puzzleSolution: response.puzzle.solution,
        };
      }),
    );
  }

  loadChessComPuzzle() {
    return this.http.get('https://api.chess.com/pub/puzzle/random').pipe(
      map((response: any) => {
        console.log(response);
        const chess = new Chess();
        chess.loadPgn(response.pgn);

        return {
          gamePgn: new Chess(response.fen).pgn(),
          puzzleSolution: chess.history(),
        };
      }),
    );
  }

  loadPuzzle(element: HTMLElement | null = null): void {
    this.element ||= element;
    const promise = this.loadChessComPuzzle();
    // const promise = this.loadLichessPuzzle();
    promise.subscribe((response: any) => {
      this.setGameFromResponse(response);
    });
  }

  lastMoveOfGame() {
    return this.game.history({
      verbose: true,
    })[this.game.history().length - 1];
  }

  initiateGame(response: PuzzleResponse): void {
    // Set Game
    this.game.loadPgn(response.gamePgn);
    console.log(this.game.ascii());

    const orientation: 'white' | 'black' =
      this.game.turn() == 'w' ? 'white' : 'black';
    const lastMove = this.lastMoveOfGame();
    const config = {
      coordinates: false,
      orientation,
      fen: this.game.fen(),
      viewOnly: true,
      lastMove: lastMove ? [lastMove.from, lastMove.to] : undefined,
    };
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
        this.solution.shift();
        setTimeout(() => this.makeOpponentMove(), 500);
        return { sucess: true };
      }

      return { sucess: false };
    } catch (err) {
      return { sucess: false };
    }
  }
}
