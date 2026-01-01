import { Injectable } from '@angular/core';
import { Move } from '../../keyboards/models/move';
import { positions, Position } from './tutorial-positions';
import { Chessground } from 'chessground';
import { BaseGameService } from '@keyboards/services/base-game.service';

@Injectable({
  providedIn: 'root',
})
export class TutorialService extends BaseGameService {
  positionIdx: number = 0;
  currentPosition: Position = positions[this.positionIdx];
  element: HTMLElement | undefined | null;
  groundboard: ReturnType<typeof Chessground> | undefined;

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

  override validateMove(move: Move): void {
    if (this.currentPosition.move.toString() == move.toString()) {
      this.positionIdx++;
      const position = positions[this.positionIdx];
      if (position) {
        this.currentPosition = position;
        this.init();
      }
    } else {
      throw 'Invalid Move';
    }
  }
}
