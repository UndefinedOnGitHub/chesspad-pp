import { Component, Input } from '@angular/core';
import { KeyboardButton } from '../button';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-keyboard-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FontAwesomeModule],
  templateUrl: './keyboard-button.component.html',
  styleUrls: ['./keyboard-button.component.scss'],
})
export class KeyboardButtonComponent {
  @Input() button: KeyboardButton | null = null;
  @Input() disabled: boolean = false;
  icon = faCoffee

  onButtonPressed() {
    if (this.button) {
      this.button.trigger(this.button);
    }
  }
}
