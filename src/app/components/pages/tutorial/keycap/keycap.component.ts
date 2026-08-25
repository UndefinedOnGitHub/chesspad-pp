import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Cap } from '../tutorial-positions';

/**
 * One key drawn inline in the tutorial text.
 *
 * Deliberately mirrors keyboard-button.component so a sequence on the card
 * reads as the same object the user is about to press: icon wins over label,
 * and the colours come from the shared --kb-key-* tokens in theme.scss.
 */
@Component({
  selector: 'app-keycap',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './keycap.component.html',
  styleUrls: ['./keycap.component.scss'],
})
export class KeycapComponent {
  cap = input.required<Cap>();
}
