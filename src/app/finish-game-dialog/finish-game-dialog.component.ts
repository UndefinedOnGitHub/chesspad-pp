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
export interface DialogData {
  pgn: string;
}

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
    this.gameString = data.pgn || this.game.exportPGN();
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
