import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KeyboardButton } from './button';
import { Pieces, Columns, Rows } from './constants';
import { Move } from './move';
import {
  faHashtag,
  faRotateRight,
  faStarOfLife,
  faXmark,
  faPlus,
  faDeleteLeft,
  faChess,
  faEquals
} from '@fortawesome/free-solid-svg-icons';

export class Keyboard {
  constructor(move: Move, onKeyboardChange: Function) {
    this.activeMove = move;
    this.onKeyboardChange = onKeyboardChange;
  }
  activeMove: Move;
  sourceMoveActive: boolean = false;
  promotionMoveActive: boolean = false;
  onKeyboardChange: Function;

  onPieceTrigger(btn: KeyboardButton) {
    if (this.promotionMoveActive) {
      this.activeMove.setPromotion(btn.symbol);
      this.promotionMoveActive = false;
      this.promotionButton.active = false;
      return;
    }
    this.pieceButtons.forEach((pb: KeyboardButton) => (pb.active = false));
    this.activeMove.setPiece(btn.symbol);
    btn.toggleActive();
  }

  onOriginMove(buttons: KeyboardButton[], btn: KeyboardButton): void {
    buttons.forEach((pb: KeyboardButton) => (pb.class = ''));
    this.activeMove.setSource(btn.symbol);
    btn.class = 'blue-active';
    btn.active = true;
    this.sourceMoveActive = false;
    this.multiMoveButton.active = false;
  }

  onColumnTrigger(btn: KeyboardButton) {
    if (this.sourceMoveActive) {
      this.onOriginMove(this.letterButtons, btn);
      return;
    }

    this.letterButtons
      .filter((pb: KeyboardButton) => pb.class != 'blue-active')
      .forEach((pb: KeyboardButton) => (pb.active = false));
    this.activeMove.setCol(btn.symbol);
    btn.toggleActive();
  }
  onRowTrigger(btn: KeyboardButton) {
    if (this.sourceMoveActive) {
      this.onOriginMove(this.numberButtons, btn);
      return;
    }
    this.numberButtons
      .filter((pb: KeyboardButton) => pb.class != 'blue-active')
      .forEach((pb: KeyboardButton) => (pb.active = false));
    this.activeMove.setRow(btn.symbol);
    btn.toggleActive();
  }
  //
  // Core Buttons
  //
  pieceButtons: KeyboardButton[] = Pieces.map(
    (p) =>
      new KeyboardButton({
        ...p,
        onTrigger: (btn: KeyboardButton) => this.onPieceTrigger(btn),
      }),
  );
  numberButtons: KeyboardButton[] = Rows.map(
    (r) =>
      new KeyboardButton({
        ...r,
        onTrigger: (btn: KeyboardButton) => this.onRowTrigger(btn),
      }),
  );
  letterButtons: KeyboardButton[] = Columns.map(
    (c) =>
      new KeyboardButton({
        ...c,
        onTrigger: (btn: KeyboardButton) => this.onColumnTrigger(btn),
      }),
  );

  //
  // Additional Buttons
  //

  // Button to switch keyboard keys
  switchButton: KeyboardButton = new KeyboardButton({
    key: 'switch_keyboard',
    icon: faHashtag,
    symbol: '',
    onTrigger: () => {
      this.switchMainButtons();
      this.onKeyboardChange();
    },
  });
  // Button to mark the king is in check
  checkButton: KeyboardButton = new KeyboardButton({
    key: 'mark_check',
    symbol: '+',
    icon: faPlus,
    onTrigger: (btn: KeyboardButton) => {
      this.activeMove.setCheck();
    },
  });
  // Button to show castle
  castleButton: KeyboardButton = new KeyboardButton({
    key: 'castle_button',
    symbol: 'O-O',
    icon: faChess,
    onTrigger: () => {
      this.resetKeyboardKeys();
      if (this.activeMove.castle == 'O-O') {
        this.activeMove.setCastle('O-O-O');
      } else {
        this.activeMove.setCastle('O-O');
      }
    },
  });
  longCastleButton: KeyboardButton = new KeyboardButton({
    key: 'mark_check',
    symbol: 'O-O-O',
    icon: faChess,
    onTrigger: () => {
      this.activeMove.setCastle('O-O-O');
    },
  });
  captureButton: KeyboardButton = new KeyboardButton({
    key: 'mark_capture',
    symbol: 'x',
    icon: faXmark,
    onTrigger: (btn: KeyboardButton) => {
      this.activeMove.setTake();
      btn.active = !btn.active;
    },
  });
  multiMoveButton: KeyboardButton = new KeyboardButton({
    key: 'multi_directional',
    symbol: '',
    icon: faStarOfLife,
    class: 'blue-active',
    onTrigger: (btn: KeyboardButton) => {
      this.sourceMoveActive = !this.sourceMoveActive;
      btn.active = this.sourceMoveActive;
    },
  });
  clearButton: KeyboardButton = new KeyboardButton({
    key: 'reset_keyboard',
    symbol: '',
    icon: faRotateRight,
    onTrigger: () => this.clearKeyboard(),
  });
  deleteButton: KeyboardButton = new KeyboardButton({
    key: 'delete_keyboard',
    symbol: '-1',
    icon: faDeleteLeft,
    onTrigger: () => {
      this.activeMove.subtractMove();
    },
  });
  promotionButton: KeyboardButton = new KeyboardButton({
    key: 'mark_promotion',
    symbol: '=',
    icon: faEquals,
    onTrigger: (btn: KeyboardButton) => {
      this.promotionMoveActive = !this.promotionMoveActive;
      btn.active = this.promotionMoveActive;
    },
  });

  mainSection: KeyboardButton[] = [
    this.switchButton,
    this.multiMoveButton,
    // this.longCastleButton
    // this.checkButton,
    this.castleButton,
    this.captureButton,
  ];
  coordinateButtons: KeyboardButton[] = this.letterButtons;

  displayCurrentMove(): string {
    return this.activeMove.output();
  }

  switchMainButtons(): void {
    if (this.coordinateButtons[0]?.type == 'column') {
      this.coordinateButtons = this.numberButtons;
    } else {
      this.coordinateButtons = this.letterButtons;
    }
  }

  resetKeyboardKeys(): void {
    this.pieceButtons
      .concat(this.numberButtons)
      .concat(this.letterButtons)
      .concat(this.mainSection)
      .forEach((b) => (b.active = false));
    this.clearKeyClass();
    this.resetMainButtons();
  }

  clearKeyboard(): void {
    this.activeMove.clear();
    this.resetKeyboardKeys();
  }

  clearKeyClass(): void {
    this.letterButtons.forEach((pb: KeyboardButton) => (pb.class = ''));
    this.numberButtons.forEach((pb: KeyboardButton) => (pb.class = ''));
  }

  resetMainButtons(): void {
    this.coordinateButtons = [];
    this.switchMainButtons();
    this.onKeyboardChange();
  }

  submit(event: any): void {
    if (!this.activeMove.valid()) {
      return;
    }
    // this.onSubmit.emit(this.displayCurrentMove());
    this.clearKeyboard();
  }
}
