import { Component } from '@angular/core';
import { Move } from './move';
import {
  faBars,
  faHeart,
  faShare,
  faCircleStop,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { EloCalculatorService, GameResult } from './elo-calculator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chesspad.pp';
  output_text = '';
  moves: Move[] = [];
  faBars: IconDefinition = faBars;
  faHeart: IconDefinition = faHeart;
  faShare: IconDefinition = faShare;
  faCircleStop: IconDefinition = faCircleStop;
  eloCalculator: EloCalculatorService;

  constructor(eloCalculator: EloCalculatorService) {
    this.eloCalculator = eloCalculator;
  }

  onKeyboardSubmit(move: Move) {
    this.moves.push(move);
  }

  onFinish() {
    const a = this.eloCalculator.getNewRating(1200, 1000, GameResult.Win);
    const b = this.eloCalculator.getNewRating(1000, 1200, GameResult.Lose);
  }
}
