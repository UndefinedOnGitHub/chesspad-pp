import { Component, input } from '@angular/core';
import { KeycapComponent } from '../keycap/keycap.component';
import { Position } from '../tutorial-positions';

/**
 * The explanation panel for one tutorial step: what the position is, the keys
 * to press, and why they are the keys to press.
 *
 * Split out of TutorialComponent so the page's own stylesheet stays layout-only
 * (and both stay inside the anyComponentStyle budget).
 */
@Component({
  selector: 'app-step-card',
  standalone: true,
  imports: [KeycapComponent],
  templateUrl: './step-card.component.html',
  styleUrls: ['./step-card.component.scss'],
})
export class StepCardComponent {
  position = input.required<Position>();
}
