import { Injectable } from '@angular/core';
import {Move} from "./move"

@Injectable({
  providedIn: 'root'
})
export class GameService {
  onChageCallbacks : Function[] = [];
  onMoveClickCallbacks : Function[] = [];
  activeMoveIdx : number = -1;
  moves : Move[] = [];

  constructor() { }

  setMoveClickCallback(func: Function) : void {
    this.onMoveClickCallbacks.push(func)
  }

  makeMove(move: Move) : void {
    if (this.activeMoveIdx >= 0) {
      this.moves[this.activeMoveIdx] = move;
      this.activeMoveIdx = -1;
      return;
    }
    this.moves.push(move);
  }

  onMoveClick(move : Move) {
    if (move.active) {
      this.activeMoveIdx = this.moves.findIndex(f => f == move)
      this.onMoveClickCallbacks.forEach(f => f(move))
    } else {
      this.activeMoveIdx = -1;
    }
  }
}
