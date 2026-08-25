import { Injectable } from '@angular/core';
import { Move } from '@keyboards/models/move';
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

  get totalSteps(): number {
    return positions.length;
  }

  get stepNumber(): number {
    return this.positionIdx + 1;
  }

  get isFirstStep(): boolean {
    return this.positionIdx == 0;
  }

  get isLastStep(): boolean {
    return this.positionIdx == positions.length - 1;
  }

  goTo(idx: number): void {
    const clamped = Math.min(Math.max(idx, 0), positions.length - 1);
    if (clamped == this.positionIdx) return;

    this.positionIdx = clamped;
    this.currentPosition = positions[clamped];
    this.init();
    this.clearKeyboard();
  }

  next(): void {
    this.goTo(this.positionIdx + 1);
  }

  back(): void {
    this.goTo(this.positionIdx - 1);
  }

  restart(): void {
    this.goTo(0);
  }

  /**
   * The keyboard owns its own Move and button state. It subscribes to
   * moveSubject and pipes whatever arrives through Keyboard#extractFromMove,
   * which clears the pad first — so an empty move resets it.
   */
  private clearKeyboard(): void {
    this.moveSubject.next(new Move(''));
  }

  private constructBoard() {
    if (!this.element) return;

    this.game.loadPgn(this.currentPosition.pgn);
    const m = this.game.history({ verbose: true })[0];
    const fen = this.game.fen();
    const lastMove = m ? [m.from, m.to] : [];

    // Reuse the instance across steps rather than leaving an orphan
    // Chessground on the element every time the position changes.
    if (this.groundboard) {
      this.groundboard.set({ fen, lastMove });
    } else {
      this.groundboard = Chessground(this.element, {
        coordinates: false,
        fen,
        viewOnly: true,
        lastMove,
      });
    }
  }

  setMoveClickCallback() {}
  getAdditionalButton() {
    return null;
  }

  override validateMove(move: Move): void {
    if (this.currentPosition.move.toString() == move.toString()) {
      this.next();
    } else {
      throw 'Invalid Move';
    }
  }
}
