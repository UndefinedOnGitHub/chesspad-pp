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
  gameResult: '1-0' | '1/2-1/2' | '0-1' = '1/2-1/2';

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
    this.scrollToLastMove();
    // Save game
    this.storeGame();
  }

  scrollToLastMove() {
    // Scroll to last move
    // Keep slight delay to force render first
    try {
      setTimeout(() => {
        const dispays = document.getElementsByTagName('app-move-display');
        const e = dispays[dispays.length - 1];
        e.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch {
      // Prevent from issues here causeing bigger problems
    }
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

  pgnMoves(): string {
    const chuncked = chunk(this.moves, 2);
    const moveRows = [];
    for (let midx = 0; midx < chuncked.length; midx++) {
      moveRows.push(
        [`${midx + 1}.`, chuncked[midx][0], chuncked[midx][1]]
          .filter((i) => i)
          .join(' '),
      );
    }
    return moveRows.join(' ');
  }

  exportPGN(): string {
    const pgnMoves = this.pgnMoves();
    const pgn = `[Event "Chesspad ++ PGN"]
[Site "Online"]
[Date "${this.formatDate()}"]
[EventDate "${this.formatDate()}"]
[Round "-"]
[Result "${this.gameResult}"]
[White "White Name"]
[Black "Black Name"]
[WhiteElo "?"]
[BlackElo "?"]
${pgnMoves} ${this.gameResult}
`;
    console.log(pgn);
    return pgn;
  }

  toString(): string {
    return this.exportPGN();
  }

  storeGame(): void {
    const pgnMoves = this.pgnMoves();
    localStorage.setItem('local_game', pgnMoves);
  }
  fetchGame(): Move[] {
    const pgn = localStorage.getItem('local_game') || '';
    const moves: Move[] = pgn
      .replaceAll('\n', ' ')
      .replaceAll('\t', '')
      .split(/\d+\./)
      .filter((i) => i.length > 0)
      .map((i) => i.trim().split(' '))
      .flat()
      .map((i) => new Move(i));
    this.moves = moves;
    this.scrollToLastMove();
    return moves;
  }
  clearGame(): void {
    this.moves = [];
    this.activeMoveIdx = -1;
    localStorage.removeItem('local_game');
  }
  isGameStored(): boolean {
    return (localStorage.getItem('local_game') || '').length > 0;
  }
}
