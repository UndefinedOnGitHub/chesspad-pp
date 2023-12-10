import { Component, Input } from '@angular/core';
import { Move } from "../move"

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent {
  @Input() moves : Move[] = [];
}
