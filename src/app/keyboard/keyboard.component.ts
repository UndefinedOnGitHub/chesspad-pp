import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { KeyboardButton } from '../button';
import { Pieces, Columns, Rows } from '../constants';
import { Move } from '../move';
import { Keyboard } from '../keyboard';
import {
  faHashtag,
  faRotateRight,
  faStarOfLife,
  faXmark,
  faPlus,
  faDeleteLeft,
  faChess,
} from '@fortawesome/free-solid-svg-icons';
import { GameService } from '../game.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  // Let the editor know the move
  @Output() onSubmit = new EventEmitter<Move>();
  // For tracking the move
  moveManager: Move = new Move();

  constructor(public game: GameService) {
    this.game.setMoveClickCallback((m: Move) => {
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
  }

  displayCurrentMove(): string {
    return this.moveManager.toString(true);
  }

  submit(event: any): void {
    if (!this.moveManager.valid()) {
      return;
    }
    this.game.makeMove(this.moveManager.clone());
    this.onSubmit.emit(this.moveManager.clone());
    this.keyboard.clearKeyboard();
  }
}
