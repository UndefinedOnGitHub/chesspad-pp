import { Component, Input } from '@angular/core';
import { Move } from "../move";

@Component({
  selector: 'app-move-display',
  templateUrl: './move-display.component.html',
  styleUrls: ['./move-display.component.scss']
})
export class MoveDisplayComponent {
  @Input() move : Move | undefined;
}
