import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  input,
  ViewChild,
} from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { KeyboardButtonComponent } from '../keyboard-button/keyboard-button.component';
// ...existing code...
import { KeyboardButton, MultiButton as MB } from '../../models/button';
import { Move } from '../../models/move';
import { Keyboard } from '../../models/keyboard';
import { BaseGameService } from '../../services/base-game.service';
import { PuzzleService } from '../../../components/puzzles/puzzle.service';
import { GameReviewService } from '../../../components/game-review/game-review.service';
import { TutorialService } from '@components/tutorial/tutorial.service';
import { MatButton } from '@angular/material/button';
import { KeyboardDisplay } from '../keyboard-display/keyboard-display';
// ...existing code...

export interface KeyboardSettings {
  allowSuggestions: boolean;
}

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [
    MatDialogModule,
    KeyboardButtonComponent,
    MatButton,
    KeyboardDisplay,
  ],
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  @ViewChild(KeyboardDisplay) display!: KeyboardDisplay;
  // Let the editor know the move
  @Output() onSubmit = new EventEmitter<Move>();
  // For tracking the move
  moveManager: Move = new Move();
  // Keyboard Settings
  keyboardSettings: KeyboardSettings = { allowSuggestions: false };
  keyboardIdx: number = 0;

  keyboard: Keyboard = new Keyboard(this.moveManager);
  matrix: (KeyboardButton | MB)[][] = [];
  externalButton = input<KeyboardButton>();

  @Input() game: BaseGameService | undefined;

  constructor() {}

  ngOnInit() {
    this.game?.moveSubject.subscribe((m) => {
      this.moveManager.fromString(String(m));
      this.keyboard.extractFromMove(m);
    });
    this.setButtons();
  }

  setButtons() {
    const [k, q, r, n, b, p] = this.keyboard.pieceButtons;
    const [r1, r2, r3, r4, r5, r6, r7, r8] = this.keyboard.numberButtons;
    const [ca, cb, cc, cd, ce, cf, cg, ch] = this.keyboard.letterButtons;
    const clr = this.keyboard.clearButton;
    const prm = this.keyboard.promotionButton;
    const swch = this.keyboard.switchButton;
    const mm = this.keyboard.multiMoveButton;
    const csl = this.keyboard.castleButton;
    const cpt = this.keyboard.captureButton;

    this.matrix = [
      [k, new MB([ca, r1]), new MB([cb, r2]), new MB([cc, r3]), n],
      [q, new MB([cd, r4]), new MB([ce, r5]), new MB([cf, r6]), b],
      [r, new MB([cg, r7]), new MB([ch, r8]), swch, p],
      [clr, mm, csl, cpt, prm],
    ];
  }

  isMulti(btn: KeyboardButton | MB) {
    return btn instanceof MB;
  }

  triggerErrorAnimation(): void {
    this.display.triggerError();
  }

  legalMoves(): Move[] {
    if (!this.keyboardSettings.allowSuggestions) {
      return [];
    }

    return this.game?.legalMoves(this.moveManager) || [];
  }

  selectPossibleMove(move: Move): void {
    this.moveManager.fromString(String(move));
    this.keyboard.extractFromMove(move);
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
