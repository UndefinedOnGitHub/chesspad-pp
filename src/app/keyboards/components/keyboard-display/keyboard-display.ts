import {
  Component,
  ElementRef,
  inject,
  input,
  model,
  output,
  ViewChild,
} from '@angular/core';
import { Move } from '../../models/move';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import {
  KeyboardSettingsDialogComponent,
  KeyboardSettings,
} from '../keyboard-settings-dialog/keyboard-settings-dialog.component';

@Component({
  selector: 'app-keyboard-display',
  imports: [FontAwesomeModule],
  templateUrl: './keyboard-display.html',
  styleUrl: './keyboard-display.scss',
})
export class KeyboardDisplay {
  move = model.required<Move>();
  keyboardSettings = model<KeyboardSettings>();
  moveSuggestions = input<Move[]>();
  onMoveSelect = output<Move>();

  private dialog = inject(MatDialog);
  @ViewChild('currentMoveDisplay') private currentMoveDisplay!: ElementRef;

  faGear = faGear;

  displayCurrentMove(): string {
    return this.move().toString(true);
  }

  selectMoveSuggestions(move: Move) {
    this.onMoveSelect.emit(move);
  }

  triggerError() {
    const ele = this.currentMoveDisplay.nativeElement;
    if (ele) {
      ele.className = 'error-animation';
      setTimeout(() => {
        ele.className = '';
      }, 1000);
    }
  }

  async openKeyboardSettings() {
    const dialogRef = this.dialog.open(KeyboardSettingsDialogComponent, {
      data: this.keyboardSettings(),
    });
    dialogRef.afterClosed().subscribe((result: KeyboardSettings | null) => {
      if (result) this.keyboardSettings.set(result);
    });
  }
}
