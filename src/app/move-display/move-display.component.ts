import { Component, Input } from '@angular/core';
import { Move } from '../move';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-move-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './move-display.component.html',
  styleUrls: ['./move-display.component.scss'],
})
export class MoveDisplayComponent {
  @Input() move: Move | undefined;
}
