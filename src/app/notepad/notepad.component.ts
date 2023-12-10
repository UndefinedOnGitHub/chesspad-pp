import { Component, Input } from '@angular/core';
import { Move } from "../move"
import { chunk } from "lodash";

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent {
  @Input() moves : Move[] = [];

  movesToRows() : Move[][] {
    if (this.moves.length == 0) {
      return [[new Move()]];
    }
    return chunk(this.moves, 2);
  }
}
