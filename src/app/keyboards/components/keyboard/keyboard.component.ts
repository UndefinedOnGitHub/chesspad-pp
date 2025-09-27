import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { KeyboardButtonComponent } from '../keyboard-button/keyboard-button.component';
// ...existing code...
import { KeyboardButton, MultiButton as MB } from '../../models/button';
import { Move } from '../../models/move';
import { Keyboard } from '../../models/keyboard';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { GameService } from '../../../game.service';
import { PuzzleService } from '../../../puzzle.service';
import { GameReviewService } from '../../../game-review.service';
import { TutorialService } from '../../../tutorial.service';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
// ...existing code...

export interface KeyboardSettings {
  allowSuggestions: boolean;
}

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [CommonModule, MatDialogModule, KeyboardButtonComponent, MatButton, FaIconComponent],
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  // Settings gear
  faGear = faGear;
  // Let the editor know the move
  @Output() onSubmit = new EventEmitter<Move>();
  // For tracking the move
  moveManager: Move = new Move();
  // Keyboard Settings
  keyboardSettings: KeyboardSettings = { allowSuggestions: false };
  @Input() game:
    | GameService
    | PuzzleService
    | GameReviewService
    | TutorialService
    | undefined;

  constructor(public dialog: MatDialog) {
    this.game?.setMoveClickCallback((m: Move) => {
      this.moveManager.fromString(String(m));
      this.keyboard.extractFromMove(m);
    });
  }

  ngOnInit() {
    this.setButtons();
  }

  keyboard: Keyboard = new Keyboard(this.moveManager, () => this.ngOnInit());
  matrix: (KeyboardButton|MB)[][] = [];
  additionalButton: KeyboardButton | null = null;

  setButtons() {
    const [k,q,r,n,b,p] = this.keyboard.pieceButtons
    const [r1,r2,r3,r4,r5,r6,r7,r8] = this.keyboard.numberButtons
    const [ca,cb,cc,cd,ce,cf,cg,ch] = this.keyboard.letterButtons
    const clr = this.keyboard.clearButton
    const prm = this.keyboard.promotionButton
    const swch = this.keyboard.switchButton
    const mm = this.keyboard.multiMoveButton
    const csl = this.keyboard.castleButton
    const cpt = this.keyboard.captureButton

    this.matrix = [
      [k, new MB([ca, r1]), new MB([cb, r2]), new MB([cc, r3]), n],
      [q, new MB([cd, r4]), new MB([ce, r5]), new MB([cf, r6]), b],
      [r, new MB([cg, r7]), new MB([ch, r8]), swch, p],
      [clr, mm, csl, cpt, prm],
    ]
    
    if (this.game) {
      this.additionalButton = this.game.getAdditionalButton();
    }
  }

  isMulti(btn: KeyboardButton | MB) {
    return btn instanceof MB
  }

  displayCurrentMove(): string {
    return this.moveManager.toString(true);
  }

  triggerErrorAnimation(): void {
    const ele = document.getElementById('currentMoveDisplay');
    if (ele) {
      ele.className = 'error-animation';
      setTimeout(() => {
        ele.className = '';
      }, 1000);
    }
  }

  possibleMoves(): Move[] {
    if (!this.keyboardSettings.allowSuggestions || !this.game) {
      return [];
    }
    const possibleMoves = this.game.game
      .moves()
      .filter((m) => m.includes(String(this.moveManager)))
      .slice(0, 3)
      .map((m) => new Move(m));

    if (
      possibleMoves.length == 1 &&
      possibleMoves[0].toString() == this.moveManager.toString()
    ) {
      return [];
    }
    return possibleMoves;
  }

  selectPossibleMove(move: Move): void {
    this.moveManager.fromString(String(move));
    this.keyboard.extractFromMove(move);
  }

  async openKeyboardSettings() {
    const { KeyboardSettingsDialogComponent } = await import(
      '../keyboard-settings-dialog/keyboard-settings-dialog.component'
    );
    const dialogRef = this.dialog.open(KeyboardSettingsDialogComponent, {
      data: this.keyboardSettings,
    });
    dialogRef.afterClosed().subscribe((result: KeyboardSettings | null) => {
      if (result) {
        this.keyboardSettings = result;
      }
    });
  }

  submit(event: any): void {
    const result = this.game?.makeMove(this.moveManager.clone());
    if (result?.success) {
      this.onSubmit.emit(this.moveManager.clone());
      this.keyboard.clearKeyboard();
    } else {
      this.triggerErrorAnimation();
    }
  }

  disableButtons(): boolean {
    // return this?.game?.isCheckmate() || false;
    return false;
  }
}
