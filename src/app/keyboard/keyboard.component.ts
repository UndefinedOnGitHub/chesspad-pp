import { Component, Input, Output, EventEmitter } from "@angular/core";
import { KeyboardButton } from "../button";
import { Pieces } from "../constants";
import { Move } from "../move";
import {
  faHashtag,
  faRotateRight,
  faStarOfLife,
  faXmark,
  faPlus,
  faDeleteLeft,
  faChess
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-keyboard",
  templateUrl: "./keyboard.component.html",
  styleUrls: ["./keyboard.component.scss"],
})
export class KeyboardComponent {
  @Input() output = "";
  @Output() outputChange = new EventEmitter<string>();
  @Output() onSubmit = new EventEmitter<string>();
  activeMove: Move = new Move();
  originMoveSelector : boolean = false;

  onButtonPress(btn: KeyboardButton): void {
    if (btn.type == "piece") {
      this.pieceButtons.forEach((pb: KeyboardButton) => (pb.active = false));
      this.activeMove.setPiece(btn.symbol);
    }
    if (btn.type == "column") {
      if (this.originMoveSelector) {
        this.letterButtons.forEach((pb: KeyboardButton) => (pb.class = ""));
        this.activeMove.setSource(btn.symbol);
        btn.class = "blue-active";
        btn.trigger();
        this.originMoveSelector = false;
        this.multiMoveButton.active = false;
        return;
      }
      this.letterButtons.filter((pb: KeyboardButton) => pb.class != "blue-active").forEach((pb: KeyboardButton) => (pb.active = false));
      this.activeMove.setCol(btn.symbol);
    }
    if (btn.type == "row") {
      if (this.originMoveSelector) {
        this.numberButtons.forEach((pb: KeyboardButton) => (pb.class = ""));
        this.activeMove.setSource(btn.symbol);
        btn.class = "blue-active";
        btn.trigger();
        this.originMoveSelector = false;
        this.multiMoveButton.active = false;
        return;
      }
      this.numberButtons.filter((pb: KeyboardButton) => pb.class != "blue-active").forEach((pb: KeyboardButton) => (pb.active = false));
      this.activeMove.setRow(btn.symbol);
    }

    btn.trigger();
    this.output += btn.symbol;

    this.outputChange.emit(this.output);
  }

  pieceButtons: KeyboardButton[] = Pieces.map((p) => new KeyboardButton(p));
  numberButtons: KeyboardButton[] = [
    new KeyboardButton({ type: "row", key: "row_1", symbol: "1" }),
    new KeyboardButton({ type: "row", key: "row_2", symbol: "2" }),
    new KeyboardButton({ type: "row", key: "row_3", symbol: "3" }),
    new KeyboardButton({ type: "row", key: "row_4", symbol: "4" }),
    new KeyboardButton({ type: "row", key: "row_5", symbol: "5" }),
    new KeyboardButton({ type: "row", key: "row_6", symbol: "6" }),
    new KeyboardButton({ type: "row", key: "row_7", symbol: "7" }),
    new KeyboardButton({ type: "row", key: "row_8", symbol: "8" }),
  ];
  letterButtons: KeyboardButton[] = [
    new KeyboardButton({ type: "column", key: "col_a", symbol: "a" }),
    new KeyboardButton({ type: "column", key: "col_b", symbol: "b" }),
    new KeyboardButton({ type: "column", key: "col_c", symbol: "c" }),
    new KeyboardButton({ type: "column", key: "col_d", symbol: "d" }),
    new KeyboardButton({ type: "column", key: "col_e", symbol: "e" }),
    new KeyboardButton({ type: "column", key: "col_f", symbol: "f" }),
    new KeyboardButton({ type: "column", key: "col_g", symbol: "g" }),
    new KeyboardButton({ type: "column", key: "col_h", symbol: "h" }),
  ];
  switchButton: KeyboardButton = new KeyboardButton({
    key: "switch_keyboard",
    icon: faHashtag,
    symbol: "",
    onTrigger: () => this.switchMainButtons(),
  });
  // checkButton: KeyboardButton = new KeyboardButton({
  //   key: "mark_check",
  //   symbol: "+",
  //   icon: faPlus,
  // });
  castleButton: KeyboardButton = new KeyboardButton({
    key: "mark_check",
    symbol: "O-O",
    icon: faChess,
    onTrigger: () => {
      if (this.activeMove.castle == "O-O") {
        this.activeMove.setCastle("O-O-O");
      } else {
        this.activeMove.setCastle("O-O");
      }
    }
  });
  longCastleButton: KeyboardButton = new KeyboardButton({
    key: "mark_check",
    symbol: "O-O-O",
    icon: faChess,
    onTrigger: () => {
      this.activeMove.setCastle("O-O-O");
    }
  });
  captureButton: KeyboardButton = new KeyboardButton({
    key: "mark_capture",
    symbol: "x",
    icon: faXmark,
    onTrigger: () => {
      this.activeMove.setTake();
    }
  });
  multiMoveButton: KeyboardButton = new KeyboardButton({
    key: "multi_directional",
    symbol: "",
    icon: faStarOfLife,
    class: "blue-active",
    onTrigger: () => {
      this.originMoveSelector = true;
      this.multiMoveButton.active = true;
    }
  });
  clearButton: KeyboardButton = new KeyboardButton({
    key: "reset_keyboard",
    symbol: "",
    icon: faRotateRight,
    onTrigger: () => this.clearKeyboard(),
  });
  deleteButton: KeyboardButton = new KeyboardButton({
    key: "delete_keyboard",
    symbol: "-1",
    icon: faDeleteLeft,
    onTrigger: () => this.clearKeyboard(),
  });

  mainSection: KeyboardButton[] = [
    this.switchButton,
    this.multiMoveButton,
    // longCastleButton
    this.castleButton,
    this.captureButton,
  ];
  output_text = "";
  leftColumn: KeyboardButton[] = this.pieceButtons
    .slice(0, 3)
    .concat([this.clearButton]);
  middleColumn: KeyboardButton[] = this.letterButtons.concat(this.mainSection);
  rightColumn: KeyboardButton[] = this.pieceButtons
    .slice(3, 6)
    .concat([this.deleteButton]);
  buttons = [this.leftColumn, this.middleColumn, this.rightColumn];

  displayCurrentMove(): string {
    this.activeMove.output();
    return this.activeMove.output();
  }

  switchMainButtons(): void {
    if (this.middleColumn[0]?.type == "column") {
      this.middleColumn = this.numberButtons.concat(this.mainSection);
    } else {
      this.middleColumn = this.letterButtons.concat(this.mainSection);
    }
  }

  clearKeyboard(): void {
    this.activeMove.clear();
    this.pieceButtons
      .concat(this.numberButtons)
      .concat(this.letterButtons)
      .concat(this.mainSection)
      .forEach((b) => (b.active = false));
    this.clearKeyClass();
    this.resetMainButtons()
  }

  clearKeyClass() : void {
    this.letterButtons.forEach((pb: KeyboardButton) => pb.class = "");
    this.numberButtons.forEach((pb: KeyboardButton) => pb.class = "");
  }

  resetMainButtons() : void {
    this.middleColumn = [];
    this.switchMainButtons();
  }

  submit(event: any): void {
    this.onSubmit.emit(this.displayCurrentMove());
    this.clearKeyboard();
  }
}
