import { Injectable } from '@angular/core';
import { Move } from './move';
import { chunk } from 'lodash';
import { Chess } from 'chess.js';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  onMoveClickCallbacks: Function[] = [];
  activeMoveIdx: number = -1;
  moves: Move[] = [];
  gameResult: '1-0' | '1/2-1/2' | '0-1' = '1/2-1/2';
  game: Chess;

  constructor() {
    this.game = new Chess();
  }

  setMoveClickCallback(func: Function): void {
    this.onMoveClickCallbacks.push(func);
  }

  makeNextMove(move: Move): void {
    this.game.move(move.toString());
    // console.log(this.game.ascii());
    this.moves.push(move);
    this.scrollToLastMove();
  }

  makeHistoricalMove(move: Move): void {
    const newGame = new Chess();
    const beforeMoves = this.game.history().slice(0, this.activeMoveIdx);
    const afterMoves = this.game
      .history()
      .slice(this.activeMoveIdx + 1, this.game.history().length);
    // Construct Game
    beforeMoves.forEach((m) => newGame.move(m.toString()));
    newGame.move(move.toString());
    afterMoves.forEach((m) => newGame.move(m.toString()));
    // Set Game
    this.game = newGame;
    // console.log(this.game.ascii());

    this.moves[this.activeMoveIdx] = move;
    this.activeMoveIdx = -1;
  }

  makeMove(move: Move): { sucess: boolean } {
    try {
      if (this.activeMoveIdx >= 0) {
        this.makeHistoricalMove(move);
      } else {
        this.makeNextMove(move);
      }
    } catch (err) {
      console.error(err);
      return { sucess: false };
    }
    // Save game
    this.storeGame();
    return { sucess: true };
  }

  scrollToLastMove(): void {
    // Scroll to last move
    // Keep slight delay to force render first
    try {
      setTimeout(() => {
        const dispays = document.getElementsByTagName('app-move-display');
        const e = dispays[dispays.length - 1];
        e.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch {
      // Prevent from issues here causeing bigger problems
    }
  }

  onMoveClick(move: Move): void {
    if (move.active) {
      this.activeMoveIdx = this.moves.findIndex((f) => f == move);
      this.onMoveClickCallbacks.forEach((f) => f(move));
    } else {
      this.activeMoveIdx = -1;
    }
  }

  formatDate(): string {
    const now = new Date();
    return `${now.getFullYear()}.${now.getMonth()}.${now.getDate()}`;
  }

  exportPGN(): string {
    this.game.header('Site', 'Chesspadd ++');
    this.game.header('Date', this.formatDate());
    this.game.header('Result', this.gameResult);
    // this.game.header('White', 'White Player');
    // this.game.header('Black', 'Black Player');
    // this.game.header('WhiteElo', '500');
    // this.game.header('BlackElo', '500');
    return this.game.pgn();
  }

  toString(): string {
    return this.exportPGN();
  }

  storeGame(): void {
    const pgnMoves = this.game.pgn();
    localStorage.setItem('local_game', pgnMoves);
  }

  fetchGame(): Move[] {
    try {
      const pgn = localStorage.getItem('local_game') || '';
      this.game.loadPgn(pgn);
      // console.log(this.game.ascii());
      this.moves = this.game.history().map((h) => new Move(h));
      this.scrollToLastMove();
    } catch (err) {
      console.error(err);
    }

    return this.moves;
  }

  clearGame(): void {
    this.game.reset();
    this.moves = [];
    this.activeMoveIdx = -1;
    localStorage.removeItem('local_game');
  }

  isGameStored(): boolean {
    return (localStorage.getItem('local_game') || '').length > 0;
  }
}
