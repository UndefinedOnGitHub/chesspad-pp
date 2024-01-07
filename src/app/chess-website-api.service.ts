import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Chess } from 'chess.js';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';

export interface PuzzleResponse {
  gamePgn: string;
  puzzleSolution: string[];
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
  constructor(public http: HttpClient) {}

  loadLichessPuzzle(): Observable<PuzzleResponse> {
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

  loadChessComPuzzle(): Observable<PuzzleResponse> {
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

  loadChessComGame(username: string): Observable<GameResponse> {
    const date = formatDate(new Date(), 'YYYY/MM', 'en-US');

    return this.http
      .get(`https://api.chess.com/pub/player/${username}/games/${date}`)
      .pipe(
        map((response: any) => {
          console.log(response);
          const randGame = Math.floor(Math.random() * response.games.length);
          const game = response.games[randGame];
          console.log(game);
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
  loadLichessGame(username: string): Observable<GameResponse> {
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
          console.log(response);
          const game = response.games[0];
          console.log(game);
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

  fetchChessGame(username: string) {
    return this.loadChessComGame(username);
  }
}
