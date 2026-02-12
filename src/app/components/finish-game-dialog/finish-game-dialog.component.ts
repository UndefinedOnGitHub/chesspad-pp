import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { GameService } from '@components/pages/game/game.service';
import { NotifyService } from '@services/notify.service';
import { Chess } from 'chess.js';
export interface DialogData {
  pgn: string;
  disabled?: boolean;
  game?: Chess;
}

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-finish-game-dialog',
  templateUrl: './finish-game-dialog.component.html',
  styleUrls: ['./finish-game-dialog.component.scss'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule
  ],
})
export class FinishGameDialogComponent implements OnInit {
  gameString: string = '';
  game = new Chess()
  private dialogRef = inject(MatDialogRef<FinishGameDialogComponent>);
  private notify = inject(NotifyService)

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    if (data.game) this.game = data.game;
    this.gameString = data.pgn || this.game.pgn();
  }

  ngOnInit(): void {
    this.pgnForm.get("result")?.setValue(this.findGameWinner())
    if (this.data.disabled) this.pgnForm.get("result")?.disable();
    
    this.assignHeaders()
    this.pgnForm.valueChanges.subscribe(changes => {
      this.assignHeaders(changes)
      // console.log(changes)
    })
  }

  private assignHeaders(changes:any={}) {
    this.game.setHeader('Site', changes.site || 'Chesspadd ++');
    this.game.setHeader('Date', this.formatDate(changes.date) || this.formatDate());
    this.game.setHeader('Result', changes.result || this.findGameWinner());
    this.game.setHeader('White', changes.white || '');
    this.game.setHeader('Black', changes.black || '');
    this.game.setHeader('WhiteElo', changes.whiteElo || '');
    this.game.setHeader('BlackElo', changes.blackElo || '');
    this.gameString = this.game.pgn();
  }

  private formatDate(date=new Date()): string {
    if (!date) return ""
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  }

  private readonly fb = inject(FormBuilder);
  pgnForm = this.fb.group({
    site: [''],
    date: [new Date()],
    result: [''],
    white: [''],
    black: [''],
    whiteElo: ['', [Validators.min(0), Validators.max(3500)]],
    blackElo: [''],
  })

  findGameWinner(): '1-0' | '1/2-1/2' | '0-1' {
    if (this.data?.game && this.data?.game?.isCheckmate()) {
      return this.data.game.turn() != 'w' ? '1-0' : '0-1';
    }
    return '1/2-1/2';
  }

  // onGameWinnerChange(ev: any) {
  //   this.game.gameResult = ev.value;
  //   this.gameString = this.game.exportPGN();
  // }

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
