import { Component } from '@angular/core';
import { Move } from './move';
import { faBars, faHeart, faShare, faCircleStop, IconDefinition } from "@fortawesome/free-solid-svg-icons"

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

  onClick = (newText: Move) => {
    this.moves.push(newText);
  };
}
