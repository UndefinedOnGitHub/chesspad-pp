import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KeyboardButton } from '../button';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-keyboard-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './keyboard-button.component.html',
  styleUrls: ['./keyboard-button.component.scss'],
})
export class KeyboardButtonComponent {
  @Input() button: KeyboardButton | null = null;
  @Input() disabled: boolean = false;

  onButtonPressed() {
    if (this.button) {
      this.button.trigger(this.button);
    }
  }
}
