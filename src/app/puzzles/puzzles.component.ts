import { Component, OnInit } from '@angular/core';
import { PuzzleService } from '../puzzle.service';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { KeyboardComponent } from '../keyboards/components/keyboard/keyboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puzzles',
  standalone: true,
  imports: [
    MatCardModule,
    MatDialogModule,
    KeyboardComponent,
    CommonModule,
  ],
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.scss'],
})
export class PuzzlesComponent implements OnInit {
  constructor(public puzzle: PuzzleService) {}

  ngOnInit() {
    this.puzzle.init(document.getElementById('puzzle-chessboard'));
  }

  boardOrientation(): string | null {
    if (this.puzzle.boardOrientation) {
      return this.puzzle.boardOrientation == 'w' ? 'White' : 'Black';
    }
    return null;
  }
}
