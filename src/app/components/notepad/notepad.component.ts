import { Component, input } from '@angular/core';
import { Move } from '../../keyboards/models/move';
import { GameService } from '@services/game.service';
import { chunk } from 'lodash';


import { MoveDisplayComponent } from '../../keyboards/components/move-display/move-display.component';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss'],
  standalone: true,
  imports: [MoveDisplayComponent],
})
export class NotepadComponent {
  game = input.required<GameService>();

  onMoveClick(move: Move | undefined) {
    if (move && !move.isEmpty()) {
      move.active = !move.active;
      this.game().onMoveClick(move);
    }
  }

  // Convert a list of moves to a double set of moves
  // to represent white and black
  movesToRows(): Move[][] {
    const moves = this.game().moves;
    const chunked = chunk(moves, 2);

    // If the previous line is full insert new line
    if (moves.length % 2 == 0) {
      chunked.push([new Move(), new Move()]);
    }
    return chunked;
  }
}
