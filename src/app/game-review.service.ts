import { Injectable } from '@angular/core';
import { Chess } from 'chess.js';
import {
  ChessWebsiteApiService,
  GameResponse,
} from './chess-website-api.service';
import { Chessground } from 'chessground';
import { Move } from './move';

@Injectable({
  providedIn: 'root',
})
export class GameReviewService {
  groundboard: any | undefined;
  game: Chess = new Chess();
  element: HTMLElement | undefined | null;
  history: string[] = [];
  currentMove: string | undefined | null;

  constructor(public api: ChessWebsiteApiService) {}

  loadGame(element: HTMLElement | null = null, username: string): void {
    this.element ||= element;
    this.game = new Chess();
    const promise = this.api.fetchChessGame(username);
    promise.subscribe((response: GameResponse) => {
      this.setGameFromResponse(response);
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
    if (this.currentMove == String(move)) {
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
      return { sucess: true };
    }
    return { sucess: false };
  }
}
