import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Chess } from 'chess.js';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Logger } from './logger';

export interface PuzzleResponse {
  gamePgn: string;
  puzzleSolution: string[];
  orientation: 'b' | 'w';
}
export interface GameResponse {
  gamePgn: string;
  history: string[];
  orientation: 'b' | 'w';
}

@Injectable({
  providedIn: 'root',
})
export class ChessWebsiteApiService {
  public http = inject(HttpClient)
  private logger = inject(Logger)

  private loadLichessPuzzle(): Observable<PuzzleResponse> {
    return this.http.get('https://lichess.org/api/puzzle/daily').pipe(
      map((response: any) => {
        this.logger.log(response);
        return {
          gamePgn: response.game.pgn,
          puzzleSolution: response.puzzle.solution,
          orientation: 'w',
        };
      }),
    );
  }

  private loadChessComPuzzle(): Observable<PuzzleResponse> {
    return this.http.get('https://api.chess.com/pub/puzzle/random').pipe(
      map((response: any) => {
        this.logger.log(response);
        const chessHistory = new Chess();
        chessHistory.loadPgn(response.pgn);

        const resultChess = new Chess(response.fen);
        return {
          gamePgn: resultChess.pgn(),
          puzzleSolution: chessHistory.history(),
          orientation: resultChess.turn(),
        };
      }),
    );
  }

  private lastMonthFormattedDate() {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');

    return `${year}/${month}`;
  }

  private loadChessComGame(
    username: string,
    color: 'white' | 'black' | '' = '',
  ): Observable<GameResponse> {
    const date = this.lastMonthFormattedDate();

    return this.http
      .get(`https://api.chess.com/pub/player/${username}/games/${date}`)
      .pipe(
        map((response: any) => {
          this.logger.log(response);
          let games = response.games.filter((g: any) => g.rules == 'chess');
          if (color) {
            games = games.filter(
              (g: any) =>
                g[color].username.toLowerCase() == username.toLowerCase(),
            );
          }
          const randGame = Math.floor(Math.random() * games.length);
          const game = games[randGame];
          this.logger.log(game);
          const chess = new Chess();
          chess.loadPgn(game.pgn);

          return {
            gamePgn: chess.pgn(),
            history: chess.history(),
            orientation:
              username.toLocaleLowerCase() ==
              game.white.username.toLocaleLowerCase()
                ? 'w'
                : 'b',
          };
        }),
      );
  }

  // Not Working. Need to get the response to be in json format.
  // Some attempts have been made but none successful.
  private loadLichessGame(username: string): Observable<GameResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'Accept',
      Accept: 'application/json',
    });

    const requestOptions = {
      headers: headers,
      params: new HttpParams().set('max', 2), //.set("pgnInJson", false)
    };

    return this.http
      .get(`https://lichess.org/api/games/user/${username}`, requestOptions)
      .pipe(
        map((response: any) => {
          this.logger.log(response);
          const game = response.games[0];
          this.logger.log(game);
          const chess = new Chess();
          chess.loadPgn(game.pgn);

          return {
            gamePgn: chess.pgn(),
            history: chess.history(),
            orientation: username == game.white.username ? 'w' : 'b',
          };
        }),
      );
  }

  fetchChessPuzzle(): Observable<PuzzleResponse> {
    return this.loadChessComPuzzle();
  }

  fetchChessGame(username: string, color: 'white' | 'black' | '' = '') {
    return this.loadChessComGame(username, color);
  }
}
