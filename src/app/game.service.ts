import { Injectable } from '@angular/core';
import { Move } from './move';
import { chunk } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  onChageCallbacks: Function[] = [];
  onMoveClickCallbacks: Function[] = [];
  activeMoveIdx: number = -1;
  moves: Move[] = [];

  constructor() {}

  setMoveClickCallback(func: Function): void {
    this.onMoveClickCallbacks.push(func);
  }

  makeMove(move: Move): void {
    if (this.activeMoveIdx >= 0) {
      this.moves[this.activeMoveIdx] = move;
      this.activeMoveIdx = -1;
      return;
    }
    this.moves.push(move);
  }

  onMoveClick(move: Move) {
    if (move.active) {
      this.activeMoveIdx = this.moves.findIndex((f) => f == move);
      this.onMoveClickCallbacks.forEach((f) => f(move));
    } else {
      this.activeMoveIdx = -1;
    }
  }

  formatDate() {
    const now = new Date();
    return `${now.getFullYear()}.${now.getMonth()}.${now.getDate()}`;
  }

  exportPGN(): string {
    const chuncked = chunk(this.moves, 2);
    const moveRows = [];
    for (let midx = 0; midx < chuncked.length; midx++) {
      moveRows.push(
        [`${midx + 1}.`, chuncked[midx][0], chuncked[midx][1]]
          .filter((i) => i)
          .join(' '),
      );
    }
    const pgnMoves = moveRows.join(' ');
    const result = '0-1';
    const pgn = `
[Event "Chesspad ++ PGN"]
[Site "Online"]
[Date "${this.formatDate()}"]
[EventDate "${this.formatDate()}"]
[Round "-"]
[Result "${result}"]
[White "White Name"]
[Black "Black Name"]
[WhiteElo "?"]
[BlackElo "?"]
${pgnMoves} ${result}
`;
    console.log(pgn);
    return pgn;
  }
}
