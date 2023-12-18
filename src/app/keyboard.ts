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
  faEquals,
} from '@fortawesome/free-solid-svg-icons';

export class Keyboard {
  constructor(move: Move, onKeyboardChange: Function) {
    this.moveManager = move;
    this.onKeyboardChange = onKeyboardChange;
  }

  // Variable for move management
  moveManager: Move;
  // Flag to manage adding to source
  sourceMoveActive: boolean = false;
  // Flag to manage adding to promotion
  promotionMoveActive: boolean = false;
  // Callback to trigger when the display of keyboard needs updating
  onKeyboardChange: Function;

  //
  // Keyboard Button Functions
  //

  resetKeyboardPieces(btns: KeyboardButton[]): void {
    btns.forEach((kb) => (kb.active = false));
  }

  onPieceTrigger(btn: KeyboardButton): void {
    if (this.promotionMoveActive) {
      this.moveManager.setPromotion(btn.symbol);
      this.promotionMoveActive = false;
      this.promotionButton.active = false;
    } else {
      this.moveManager.setPiece(btn.symbol);
      this.resetKeyboardPieces(this.pieceButtons);
      btn.toggleActive();
    }
  }

  onSourceMove(
    buttons: KeyboardButton[],
    btn: KeyboardButton,
    location: 'column' | 'row',
  ): void {
    buttons.forEach((kb: KeyboardButton) => (kb.class = ''));
    this.moveManager.setSource(btn.symbol, location);
    btn.class = 'blue-active';
    btn.active = true;
    this.sourceMoveActive = false;
    this.multiMoveButton.active = false;
  }

  onColumnTrigger(btn: KeyboardButton): void {
    if (this.sourceMoveActive) {
      this.onSourceMove(this.letterButtons, btn, 'column');
    } else {
      this.letterButtons
        .filter((kb: KeyboardButton) => kb.class != 'blue-active')
        .forEach((kb: KeyboardButton) => (kb.active = false));
      this.moveManager.setCol(btn.symbol);
      btn.toggleActive();
    }
  }

  onRowTrigger(btn: KeyboardButton): void {
    if (this.sourceMoveActive) {
      this.onSourceMove(this.numberButtons, btn, 'row');
    } else {
      this.numberButtons
        .filter((kb: KeyboardButton) => kb.class != 'blue-active')
        .forEach((kb: KeyboardButton) => (kb.active = false));
      this.moveManager.setRow(btn.symbol);
      btn.toggleActive();
    }
  }

  //
  // Core Buttons Definitions
  //

  // Piece Button: KQRBNP
  pieceButtons: KeyboardButton[] = Pieces.map(
    (p) =>
      new KeyboardButton({
        ...p,
        onTrigger: (btn: KeyboardButton) => this.onPieceTrigger(btn),
      }),
  );
  // Number Buttons: 12345678
  numberButtons: KeyboardButton[] = Rows.map(
    (r) =>
      new KeyboardButton({
        ...r,
        onTrigger: (btn: KeyboardButton) => this.onRowTrigger(btn),
      }),
  );
  // Letter Buttons: abcdefgh
  letterButtons: KeyboardButton[] = Columns.map(
    (c) =>
      new KeyboardButton({
        ...c,
        onTrigger: (btn: KeyboardButton) => this.onColumnTrigger(btn),
      }),
  );

  //
  // Additional Button Definitions
  //

  // Button to switch keyboard keys
  switchButton: KeyboardButton = new KeyboardButton({
    key: 'switch_keyboard',
    icon: faHashtag,
    symbol: '',
    onTrigger: () => {
      this.switchCoordinateButtons();
      this.onKeyboardChange();
    },
  });

  // Button to mark the king is in check. Not In Use
  checkButton: KeyboardButton = new KeyboardButton({
    key: 'mark_check',
    symbol: '+',
    icon: faPlus,
    onTrigger: (btn: KeyboardButton) => {
      this.moveManager.setCheck();
    },
  });

  // Button to show castle
  castleButton: KeyboardButton = new KeyboardButton({
    key: 'castle_button',
    symbol: 'O-O',
    icon: faChess,
    onTrigger: () => {
      this.resetKeyboardKeys();
      if (this.moveManager.castle == 'O-O') {
        this.moveManager.setCastle('O-O-O');
      } else {
        this.moveManager.setCastle('O-O');
      }
    },
  });

  // Button to long castle. Not In Use
  longCastleButton: KeyboardButton = new KeyboardButton({
    key: 'mark_check',
    symbol: 'O-O-O',
    icon: faChess,
    onTrigger: () => {
      this.moveManager.setCastle('O-O-O');
    },
  });

  // Button to mark a piece is captured
  captureButton: KeyboardButton = new KeyboardButton({
    key: 'mark_capture',
    symbol: 'x',
    icon: faXmark,
    onTrigger: (btn: KeyboardButton) => {
      this.moveManager.setTake();
      btn.active = !btn.active;
    },
  });

  // Button to activate source move selection
  multiMoveButton: KeyboardButton = new KeyboardButton({
    key: 'source_move_selector',
    symbol: '',
    icon: faStarOfLife,
    class: 'blue-active',
    onTrigger: (btn: KeyboardButton) => {
      this.sourceMoveActive = !this.sourceMoveActive;
      btn.active = this.sourceMoveActive;
    },
  });

  // Button to clear the keyboard move and buttons
  clearButton: KeyboardButton = new KeyboardButton({
    key: 'reset_keyboard',
    symbol: '',
    icon: faRotateRight,
    onTrigger: () => this.clearKeyboard(),
  });

  // Button to delete the last char in the move string. Not In Use
  deleteButton: KeyboardButton = new KeyboardButton({
    key: 'delete_keyboard',
    symbol: '-1',
    icon: faDeleteLeft,
    onTrigger: () => {
      this.moveManager.subtractMove();
    },
  });

  // Button to activate promotion move selection
  promotionButton: KeyboardButton = new KeyboardButton({
    key: 'mark_promotion',
    symbol: '=',
    icon: faEquals,
    onTrigger: (btn: KeyboardButton) => {
      this.promotionMoveActive = !this.promotionMoveActive;
      btn.active = this.promotionMoveActive;
    },
  });

  //
  // Button definitions to be used by the component
  //

  additionalButtons: KeyboardButton[] = [
    this.switchButton,
    this.multiMoveButton,
    this.longCastleButton,
    this.checkButton,
    this.castleButton,
    this.captureButton,
  ];
  coordinateButtons: KeyboardButton[] = this.letterButtons;

  switchCoordinateButtons(): void {
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
      .concat(this.additionalButtons)
      .forEach((b) => (b.active = false));
    this.clearKeyClass();
    this.resetMainButtons();
  }

  clearKeyboard(): void {
    this.moveManager.clear();
    this.resetKeyboardKeys();
  }

  clearKeyClass(): void {
    this.letterButtons.forEach((kb: KeyboardButton) => (kb.class = ''));
    this.numberButtons.forEach((kb: KeyboardButton) => (kb.class = ''));
  }

  resetMainButtons(): void {
    this.coordinateButtons = [];
    this.switchCoordinateButtons();
    this.onKeyboardChange();
  }
}
