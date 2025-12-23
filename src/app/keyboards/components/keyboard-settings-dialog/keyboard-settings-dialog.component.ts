import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
export interface KeyboardSettings {
  allowSuggestions: boolean;
}


import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-keyboard-settings-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatSlideToggleModule,
    MatButtonModule
],
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
