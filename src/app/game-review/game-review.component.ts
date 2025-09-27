import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { KeyboardComponent } from '../keyboards/components/keyboard/keyboard.component';
import { GameReviewService } from '../game-review.service';
import { chunk } from 'lodash';

@Component({
  selector: 'app-game-review',
  templateUrl: './game-review.component.html',
  styleUrls: ['./game-review.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, KeyboardComponent],
})
export class GameReviewComponent implements OnInit {
  constructor(public gameReview: GameReviewService) {}

  currentMoves(): string[][] {
    const cmoves = this.gameReview.game
      .history()
      .slice(0, this.gameReview.game.history().length - 1);
    return chunk(cmoves, 2);
  }

  ngOnInit() {
    this.gameReview.init(document.getElementById('chessboard'));
  }
}
