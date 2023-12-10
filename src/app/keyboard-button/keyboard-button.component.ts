import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KeyboardButton } from "../button"

@Component({
  selector: 'app-keyboard-button',
  templateUrl: './keyboard-button.component.html',
  styleUrls: ['./keyboard-button.component.scss']
})
export class KeyboardButtonComponent {
  @Input() button : KeyboardButton | null = null;
  // @Output() onClick = new EventEmitter<KeyboardButton>();

  onButtonPressed() {
    if (this.button) {
      this.button.trigger(this.button);
      // this.onClick.emit(this.button)
    }
  }
}
