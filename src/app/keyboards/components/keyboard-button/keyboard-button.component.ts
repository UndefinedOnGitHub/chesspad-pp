import { Component, input, Input } from '@angular/core';
import { KeyboardButton } from '../../models/button';

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
  button = input.required<KeyboardButton>();
  disabled = input<boolean>(false);
  icon = faCoffee;

  onButtonPressed() {
    this.button()?.trigger(this.button());
  }
}
