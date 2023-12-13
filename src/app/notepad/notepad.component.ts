import { Component, Input } from '@angular/core';
import { Move } from '../move';
import { chunk } from 'lodash';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss'],
})
export class NotepadComponent {
  @Input() moves: Move[] = [];

  movesToRows(): Move[][] {
    const chunked = chunk(this.moves, 2);
    if (this.moves.length % 2 == 0) {
      chunked.push([new Move(), new Move()]);
    }
    return chunked;
  }
}
