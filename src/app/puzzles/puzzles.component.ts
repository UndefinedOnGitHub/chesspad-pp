import { Component, OnInit } from '@angular/core';
import { Chess } from 'chess.js';
import { PuzzleService } from '../puzzle.service';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.scss'],
})
export class PuzzlesComponent implements OnInit {
  constructor(public puzzle: PuzzleService) {}

  ngOnInit() {
    this.puzzle.loadPuzzle(document.getElementById('chessboard'));
  }
}
