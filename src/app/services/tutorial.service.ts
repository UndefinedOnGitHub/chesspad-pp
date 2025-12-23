import { Injectable } from '@angular/core';
import { Chess } from 'chess.js';
import { Move } from '../keyboards/models/move';
import { positions, Position } from '../tutorial-positions';
import { Chessground } from 'chessground';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  positionIdx: number = 0;
  currentPosition: Position = positions[this.positionIdx];
  game: Chess = new Chess();
  element: HTMLElement | undefined | null;
  groundboard: ReturnType<typeof Chessground> | undefined;

  constructor() {}

  init(element: HTMLElement | null = null): void {
    if (element) {
      this.element = element;
    }
    this.constructBoard();
  }

  private constructBoard() {
    // Set Digital Board
    if (this.element) {
      this.game.loadPgn(this.currentPosition.pgn);
      const m = this.game.history({ verbose: true })[0];
      const config = {
        coordinates: false,
        fen: this.game.fen(),
        viewOnly: true,
        lastMove: m ? [m.from, m.to] : [],
      };
      this.groundboard = Chessground(this.element, config);
    }
  }

  setMoveClickCallback() {}
  getAdditionalButton() {
    return null;
  }
  makeMove(move: Move): { success: boolean } {
    if (this.currentPosition.move.toString() == move.toString()) {
      this.positionIdx++;
      const position = positions[this.positionIdx];
      if (position) {
        this.currentPosition = position;
        this.init();
      }
      return { success: true };
    }
    return { success: false };
  }
}
