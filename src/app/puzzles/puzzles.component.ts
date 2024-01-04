import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chessground } from 'chessground';
import { Chess } from 'chess.js';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.scss'],
})
export class PuzzlesComponent implements OnInit {
  groundboard: any | undefined;
  game: Chess;

  constructor(public http: HttpClient) {
    this.game = new Chess();
  }

  lastMoveOfGame() {
    return this.game.history({
      verbose: true,
    })[this.game.history().length - 1];
  }

  setGameFromResponse(response: any, element: any) {
    this.game.loadPgn(response.game.pgn);
    console.log(this.game.ascii());

    const lastMove = this.lastMoveOfGame();
    const config = {
      coordinates: false,
      fen: this.game.fen(),
      viewOnly: true,
      lastMove: [lastMove.from, lastMove.to],
    };
    this.groundboard = Chessground(element, config);

    const solution: string[] = response.puzzle.solution || [];
    console.log(solution);
    const interval = setInterval(() => {
      const move = solution.shift();
      if (!move) {
        clearInterval(interval);
      } else {
        const m = this.game.move(move);
        this.groundboard.set({
          fen: this.game.fen(),
          lastMove: [m.from, m.to],
        });
        console.log(this.game.ascii());
      }
    }, 1000);
  }

  ngOnInit() {
    const element = document.getElementById('chessboard');
    if (element) {
      this.http
        .get('https://lichess.org/api/puzzle/daily')
        .subscribe((response: any) => {
          this.setGameFromResponse(response, element);
        });
    }
  }
}
