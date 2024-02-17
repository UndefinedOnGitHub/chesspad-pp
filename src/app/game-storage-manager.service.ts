import { Injectable } from '@angular/core';
import { Chess } from 'chess.js';

@Injectable({
  providedIn: 'root'
})
export class GameStorageManagerService {

  constructor() { }

  storeGame(key: string, game: Chess): void {
    try {
      const pgn64 = btoa(game.pgn());
      localStorage.setItem(key, pgn64);
    } catch {
      console.error("Failed to store game")
    }
  }

  fetchGame(key: string) : Chess | undefined {
    try {
      const pgn64 = localStorage.getItem(key) || '';
      if (pgn64) {
        const pgn = atob(pgn64);
        const game = new Chess();
        game.loadPgn(pgn);
        return game
      }
    } catch (err) {
      console.error("Failed to fetch game", err);
    }
    return;
  }

  clearGame(key: string): void {
    localStorage.removeItem(key)
  }

  isGameStored(key: string): boolean {
    return (localStorage.getItem(key) || '').length > 0;
  }
}
