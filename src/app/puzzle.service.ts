import { Injectable } from '@angular/core';
import { Chess } from 'chess.js';

@Injectable({
  providedIn: 'root',
})
export class PuzzleService {
  game: Chess;
  constructor() {
    this.game = new Chess();
  }

  setMoveClickCallback() {}
  makeMove() {}
}
