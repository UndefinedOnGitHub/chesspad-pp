import { Component, EventEmitter, Output, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { Position } from '../tutorial-positions';

/**
 * The step counter, the jump-to-step dots and Restart, kept on one line at
 * every width.
 */
@Component({
  selector: 'app-step-progress',
  standalone: true,
  imports: [MatButtonModule, FontAwesomeModule],
  templateUrl: './step-progress.component.html',
  styleUrls: ['./step-progress.component.scss'],
})
export class StepProgressComponent {
  steps = input.required<Position[]>();
  current = input.required<number>();

  @Output() stepSelect = new EventEmitter<number>();
  @Output() restart = new EventEmitter<void>();

  readonly faRotateLeft = faRotateLeft;
}
