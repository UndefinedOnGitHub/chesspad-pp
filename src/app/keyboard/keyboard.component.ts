import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { KeyboardButton } from '../button';
import { Pieces, Columns, Rows } from '../constants';
import { Move } from '../move';
import { Keyboard } from '../keyboard';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { GameService } from '../game.service';
import { PuzzleService } from '../puzzle.service';
import { GameReviewService } from '../game-review.service';
import { TutorialService } from '../tutorial.service';
import { MatDialog } from '@angular/material/dialog';
import { KeyboardSettingsDialogComponent } from '../keyboard-settings-dialog/keyboard-settings-dialog.component';

export interface KeyboardSettings {
  allowSuggestions: boolean;
}

@Component({
  selector: 'app-keyboard',
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
  leftColumn: KeyboardButton[] = [];
  middleColumn: KeyboardButton[] = [];
  rightColumn: KeyboardButton[] = [];
  additionalButton: KeyboardButton | null = null;

  setButtons() {
    this.leftColumn = this.keyboard.pieceButtons
      .slice(0, 3)
      .concat([this.keyboard.clearButton]);
    this.middleColumn = this.keyboard.coordinateButtons.concat([
      this.keyboard.switchButton,
      this.keyboard.multiMoveButton,
      this.keyboard.castleButton,
      this.keyboard.captureButton,
    ]);
    this.rightColumn = this.keyboard.pieceButtons
      .slice(3, 6)
      .concat([this.keyboard.promotionButton]);

    if (this.game) {
      this.additionalButton = this.game.getAdditionalButton();
    }
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

  openKeyboardSettings() {
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
    if (result?.sucess) {
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
