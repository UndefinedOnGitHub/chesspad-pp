import { Component, Inject, EventEmitter } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
export interface KeyboardSettings {
  allowSuggestions: boolean;
}

@Component({
  selector: 'app-keyboard-settings-dialog',
  templateUrl: './keyboard-settings-dialog.component.html',
  styleUrls: ['./keyboard-settings-dialog.component.scss'],
})
export class KeyboardSettingsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<KeyboardSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: KeyboardSettings,
  ) {
    this.settings = data;
  }

  settings: KeyboardSettings = {
    allowSuggestions: false,
  };

  onChange(key: 'allowSuggestions', event: MatSlideToggleChange) {
    this.settings[key] = event.checked;
  }

  submit() {
    this.dialogRef.close(this.settings);
  }
}
