import { Component, OnInit } from '@angular/core';
import { GameReviewService } from '../game-review.service';
import { chunk } from 'lodash';

@Component({
  selector: 'app-game-review',
  templateUrl: './game-review.component.html',
  styleUrls: ['./game-review.component.scss'],
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
