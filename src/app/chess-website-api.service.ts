import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Chess } from 'chess.js';
import { HttpClient } from '@angular/common/http';

export interface PuzzleResponse {
  gamePgn: string;
  puzzleSolution: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChessWebsiteApiService {
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

  fetchChessPuzzle() {
    return this.loadChessComPuzzle();
  }
}
