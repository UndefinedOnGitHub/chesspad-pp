import { Injectable } from '@angular/core';
import { Move } from './move';
import { chunk } from 'lodash';
import { Chess } from 'chess.js';

@Injectable({
  providedIn: 'root',
})

/**
 *
 * The Game Service
 *
 * This service keeps track of the chess match.
 * We track the moves in 2 ways. `game` & `moves`.
 *
 * Game uses a chess service that manages the legal moves.
 *
 * Moves is a list of the Chesspad Moves. These `moves` are unrestiricted.
 * While the `game` must meet the bounds of an actual chess match the `moves` are simply the
 * list of chess moves.
 *
 * We manage both lists as they provide flexibilty for future changes.
 *
 */
export class GameService {
  moves: Move[] = [];
  game: Chess;

  activeMoveIdx: number = -1;
  gameResult: '1-0' | '1/2-1/2' | '0-1' = '1/2-1/2';

  onMoveClickCallbacks: Function[] = [];

  constructor() {
    this.game = new Chess();
  }

  setMoveClickCallback(func: Function): void {
    this.onMoveClickCallbacks.push(func);
  }

  makeMove(move: Move): { sucess: boolean } {
    try {
      if (this.activeMoveIdx >= 0) {
        this.#makeHistoricalMove(move);
      } else {
        this.#makeNextMove(move);
      }
    } catch (err) {
      console.error(err);
      return { sucess: false };
    }

    // Save game
    this.storeGame();
    return { sucess: true };
  }

  isCheckmate(): boolean {
    return this.game.isCheckmate();
  }

  currentTurn(): 'w' | 'b' {
    return this.game.turn();
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

  /**
   * [Site "Chesspadd ++"]
   * [Date "2023.11.29"]
   * [Result "1/2-1/2"]
   * [White ""]
   * [Black ""]
   * [WhiteElo ""]
   * [BlackElo ""]
   *
   * 1. e4 e5 2. Bc4 Bc5 3. Nf3 Nf6 4. O-O O-O
   */

  exportPGN(): string {
    this.game.header('Site', 'Chesspadd ++');
    this.game.header('Date', this.formatDate());
    this.game.header('Result', this.gameResult);
    this.game.header('White', '');
    this.game.header('Black', '');
    this.game.header('WhiteElo', '');
    this.game.header('BlackElo', '');

    return this.game.pgn();
  }

  toString(): string {
    return this.exportPGN();
  }

  // Game Storage Functions
  storeGame(): void {
    const pgnMoves = this.game.pgn();
    localStorage.setItem('local_game', pgnMoves);
  }

  fetchGame(): Move[] {
    try {
      const pgn = localStorage.getItem('local_game') || '';
      this.game.loadPgn(pgn);
      this.#logGame('Game Loaded');
      this.moves = this.game.history().map((h) => new Move(h));
      this.#scrollToLastMove();
    } catch (err) {
      console.error(err);
    }

    return this.moves;
  }

  clearGame(): void {
    this.game.reset();
    this.moves = [];

    this.#logGame('Game Cleared!');
    this.activeMoveIdx = -1;
    localStorage.removeItem('local_game');
  }

  getAdditionalButton() {
    return null;
  }

  #scrollToLastMove(): void {
    // Scroll to last move
    // Keep slight delay to force the render of the move before animation
    try {
      setTimeout(() => {
        const dispays = document.getElementsByTagName('app-move-display');
        const e = dispays[dispays.length - 1];
        e?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch {
      // Prevent from issues here causeing bigger problems
    }
  }

  // Make move on last position
  #makeNextMove(move: Move): void {
    const gameMove = this.game.move(move.toString());
    this.moves.push(new Move(gameMove.san));
    this.#logGame();
    this.#scrollToLastMove();
  }

  // Make move at a previous position
  #makeHistoricalMove(move: Move): void {
    const newGame = new Chess();
    const beforeChangeMoves = this.game.history().slice(0, this.activeMoveIdx);
    const afterChangeMoves = this.game
      .history()
      .slice(this.activeMoveIdx + 1, this.game.history().length);

    // Reconstruct Game
    beforeChangeMoves.forEach((m) => newGame.move(m.toString()));
    newGame.move(move.toString());
    afterChangeMoves.forEach((m) => newGame.move(m.toString()));

    // Set Game
    this.game = newGame;
    this.moves[this.activeMoveIdx] = move;

    this.#logGame();
    this.activeMoveIdx = -1;
  }

  // Check if the local game exists
  #isGameStored(): boolean {
    return (localStorage.getItem('local_game') || '').length > 0;
  }

  // Log Game for Debugging

  #logGame(logLabel: string | undefined = undefined): void {
    let printString = this.game.ascii();
    if (logLabel) {
      printString = `${logLabel}\n\n${printString}`;
    }
    console.log(printString);
  }
}
