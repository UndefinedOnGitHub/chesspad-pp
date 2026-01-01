import { Injectable } from '@angular/core';
import { Move } from '../models/move';
import { Chess } from 'chess.js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/**
 *
 * The Base Game Service
 *
 * This service should be extended to fit the keyboard needs
 *
 *
 * We keep track of move history with `moves`
 *
 * We know legal moves with `game`
 *
 * Move Subject can alert when a move is made
 *
 */
export class BaseGameService {
  moves: Move[] = [];
  game: Chess = new Chess();

  moveSubject = new BehaviorSubject(new Move());

  validateMove(move: Move) {
    throw 'Not implemented';
  }

  makeMove(move: Move): { success: boolean } {
    try {
      this.validateMove(move);
      // this.moves.push(move);
      return { success: true };
    } catch {
      return { success: false };
    }
  }

  legalMoves(move: Move) {
    const legalMoves = this.game
      .moves()
      .filter((m) => m.includes(String(move)))
      .slice(0, 3)
      .map((m) => new Move(m));

    if (legalMoves.length == 1 && legalMoves[0].toString() == move.toString()) {
      return [];
    }
    return legalMoves;
  }
}
