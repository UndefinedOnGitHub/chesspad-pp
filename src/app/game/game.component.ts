import { Component } from '@angular/core';
import { Move } from '../move';
import { GameService } from '../game.service';
import {
  faBars,
  faHeart,
  faShare,
  faCircleStop,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { EloCalculatorService, GameResult } from '../elo-calculator.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  title = 'chesspad.pp';
  output_text = '';
  faBars: IconDefinition = faBars;
  faHeart: IconDefinition = faHeart;
  faShare: IconDefinition = faShare;
  faCircleStop: IconDefinition = faCircleStop;
  eloCalculator: EloCalculatorService;
  game: GameService;

  constructor(eloCalculator: EloCalculatorService, game: GameService) {
    this.eloCalculator = eloCalculator;
    this.game = game;
  }

  onFinish() {
    const txt = this.game.exportPGN();
    navigator.clipboard.writeText(txt);

    const a = this.eloCalculator.getNewRating(1200, 1000, GameResult.Win);
    const b = this.eloCalculator.getNewRating(1000, 1200, GameResult.Lose);
  }
}
