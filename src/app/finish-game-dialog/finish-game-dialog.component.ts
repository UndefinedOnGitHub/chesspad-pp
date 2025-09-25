import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { GameService } from '../game.service';
import { NotifyService } from '../notify.service';
import { Chess } from 'chess.js';
export interface DialogData {
  pgn: string;
  disabled?: boolean;
  game?: Chess;
}

import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-finish-game-dialog',
  templateUrl: './finish-game-dialog.component.html',
  styleUrls: ['./finish-game-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class FinishGameDialogComponent {
  gameString: string = '';
  gameDisabled: boolean = false;
  gameWinner: '0-1' | '1/2-1/2' | '1-0' = '1/2-1/2';

  constructor(
    public dialogRef: MatDialogRef<FinishGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public game: GameService,
    public notify: NotifyService,
  ) {
    if (data.game) {
      this.game.game = data.game;
    }
    this.gameString = data.pgn || this.game.exportPGN();
    this.gameWinner = this.findGameWinner();
    this.onGameWinnerChange({ value: this.gameWinner });
    this.gameDisabled = data.disabled || false;
  }

  findGameWinner(): '1-0' | '1/2-1/2' | '0-1' {
    if (this.data?.game && this.data?.game?.isCheckmate()) {
      return this.data.game.turn() != 'w' ? '1-0' : '0-1';
    }
    return '1/2-1/2';
  }

  onGameWinnerChange(ev: any) {
    this.game.gameResult = ev.value;
    this.gameString = this.game.exportPGN();
  }

  close() {
    this.dialogRef.close({ new: true });
  }

  copy() {
    navigator.clipboard.writeText(this.gameString);
    this.notify.warn('PGN Copied');
  }

  copyAndGo(href: string): void {
    navigator.clipboard.writeText(this.gameString);
    // Allow keyboard to get the copy before opening the tab
    setTimeout(() => {
      window.open(href, '_blank');
    });
  }
}
