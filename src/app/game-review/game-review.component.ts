import { Component, OnInit } from '@angular/core';
import { GameReviewService } from '../game-review.service';
import { MatSelectChange } from '@angular/material/select';
import { chunk } from 'lodash';

@Component({
  selector: 'app-game-review',
  templateUrl: './game-review.component.html',
  styleUrls: ['./game-review.component.scss'],
})
export class GameReviewComponent implements OnInit {
  activeUsername: string = 'hikaru';
  constructor(public gameReview: GameReviewService) {}

  usernames = [
    { username: 'hikaru', name: 'Hikaru Nakamura' },
    { username: 'magnuscarlsen', name: 'Magnus Carlsen' },
    { username: 'danielnaroditsky', name: 'Daniel Naroditsky' },
    { username: 'nihalsarin', name: 'Nihal Sarin' },
    { username: 'firouzja2003', name: 'Alireza Firouzja' },
    { username: 'fairchess_on_youtube', name: 'Dmitry Andreikin' },
    { username: 'duhless', name: 'Daniil Dubov' },
    { username: 'hansontwitch', name: 'Hans Niemann' },
    { username: 'fabianocaruana', name: 'Fabiano Caruana' },
    { username: 'levonaronian', name: 'Levon Aronian' },
    { username: 'oleksandr_bortnyk', name: 'Oleksandr Bortnyk' },
    { username: 'gmwso', name: 'Wesley So' },
    { username: 'polish_fighter3000', name: 'Jan-Krzysztof Duda' },
    { username: 'bigfish1995', name: 'Vladimir Fedoseev' },
  ];

  currentMoves(): string[][] {
    const cmoves = this.gameReview.game
      .history()
      .slice(0, this.gameReview.game.history().length - 1);
    return chunk(cmoves, 2);
  }

  ngOnInit() {
    this.gameReview.loadGame(
      document.getElementById('chessboard'),
      this.activeUsername,
    );
  }

  usernameChange(event: MatSelectChange) {
    this.gameReview.loadGame(
      document.getElementById('chessboard'),
      event.value,
    );
  }
}
