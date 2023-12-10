import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { KeyboardButton } from "../button";
import { Pieces, Columns, Rows } from "../constants";
import { Move } from "../move";
import { Keyboard } from "../keyboard";
import {
  faHashtag,
  faRotateRight,
  faStarOfLife,
  faXmark,
  faPlus,
  faDeleteLeft,
  faChess,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-keyboard",
  templateUrl: "./keyboard.component.html",
  styleUrls: ["./keyboard.component.scss"],
})
export class KeyboardComponent implements OnInit {
  // String of key presses
  @Input() output = "";
  @Output() outputChange = new EventEmitter<string>();
  // Let the editor know the move
  @Output() onSubmit = new EventEmitter<Move>();
  // For tracking the move
  activeMove: Move = new Move();
  originMoveSelector: boolean = false;

  ngOnInit() {
    this.setButtons();
  }

  onKeyboardChange() {
    // debugger;
    this.setButtons();
  }

  keyboard: Keyboard = new Keyboard(this.activeMove, () =>
    this.onKeyboardChange(),
  );
  leftColumn: KeyboardButton[] = [];
  middleColumn: KeyboardButton[] = [];
  rightColumn: KeyboardButton[] = [];

  setButtons() {
    this.leftColumn = this.keyboard.pieceButtons
      .slice(0, 3)
      .concat([this.keyboard.clearButton]);
    this.middleColumn = this.keyboard.coordinateButtons.concat(
      this.keyboard.mainSection,
    );
    this.rightColumn = this.keyboard.pieceButtons
      .slice(3, 6)
      .concat([this.keyboard.deleteButton]);
  }

  displayCurrentMove(): string {
    return this.activeMove.toString();
  }

  submit(event: any): void {
    if (!this.activeMove.valid()) {
      return;
    }
    // this.onSubmit.emit(this.displayCurrentMove());
    this.onSubmit.emit(this.activeMove.clone());
    this.keyboard.clearKeyboard();
  }
}
