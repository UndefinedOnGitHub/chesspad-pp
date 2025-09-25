import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
export interface DialogData {}
export interface DialogCloseResponse {
  username: string;
  color: 'white' | 'black' | '';
}

import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-game-review-selector-dialog',
  templateUrl: './game-review-selector-dialog.component.html',
  styleUrls: ['./game-review-selector-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
  ],
})
export class GameReviewSelectorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GameReviewSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  activeColor: 'white' | 'black' | '' = '';
  activeUsername: string = 'hikaru';
  usernames = [
    { username: 'hikaru', name: 'Hikaru Nakamura' },
    { username: 'magnuscarlsen', name: 'Magnus Carlsen' },
    { username: 'danielnaroditsky', name: 'Daniel Naroditsky' },
    { username: 'nihalsarin', name: 'Nihal Sarin' },
    { username: 'firouzja2003', name: 'Alireza Firouzja' },
    { username: 'fairchess_on_youtube', name: 'Dmitry Andreikin' },
    { username: 'duhless', name: 'Daniil Dubov' },
    { username: 'hansontwitch', name: 'Hans Niemann' },
    { username: 'fabianocaruana', name: 'Fabiano Caruana' },
    { username: 'levonaronian', name: 'Levon Aronian' },
    { username: 'oleksandr_bortnyk', name: 'Oleksandr Bortnyk' },
    { username: 'gmwso', name: 'Wesley So' },
    { username: 'polish_fighter3000', name: 'Jan-Krzysztof Duda' },
    { username: 'bigfish1995', name: 'Vladimir Fedoseev' },
  ];

  submit() {
    this.dialogRef.close({
      username: this.activeUsername,
      color: this.activeColor,
    });
  }
}
