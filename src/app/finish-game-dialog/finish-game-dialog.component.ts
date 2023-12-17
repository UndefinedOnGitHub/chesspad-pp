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
export interface DialogData {}

@Component({
  selector: 'app-finish-game-dialog',
  templateUrl: './finish-game-dialog.component.html',
  styleUrls: ['./finish-game-dialog.component.scss'],
})
export class FinishGameDialogComponent {
  gameString: string = '';

  constructor(
    public dialogRef: MatDialogRef<FinishGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public game: GameService,
    public notify: NotifyService,
  ) {
    this.gameString = this.game.exportPGN();
  }

  gameWinner: '0-1' | '1/2-1/2' | '1-0' = '1/2-1/2';

  onGameWinnerChange(ev: any) {
    this.game.gameResult = ev.value;
    this.gameString = this.game.exportPGN();
  }

  close() {
    this.game.clearGame();
    this.dialogRef.close();
  }
  copy() {
    const txt = this.game.exportPGN();
    navigator.clipboard.writeText(txt);
    this.notify.warn('PGN Copied');
  }
}
