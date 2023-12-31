import { Component, Input } from '@angular/core';
import { Move } from '../move';
import { GameService } from '../game.service';
import { chunk } from 'lodash';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss'],
})
export class NotepadComponent {
  game: GameService;

  constructor(game: GameService) {
    this.game = game;
  }

  onMoveClick(move: Move | undefined) {
    if (move && !move.isEmpty()) {
      move.active = !move.active;
      this.game.onMoveClick(move);
    }
  }

  // Convert a list of moves to a double set of moves
  // to represent white and black
  movesToRows(): Move[][] {
    const moves = this.game.moves;
    const chunked = chunk(moves, 2);

    // If the previous line is full insert new line
    if (moves.length % 2 == 0) {
      chunked.push([new Move(), new Move()]);
    }
    return chunked;
  }
}
