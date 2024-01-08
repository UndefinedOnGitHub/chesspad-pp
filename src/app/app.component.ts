import { Component } from '@angular/core';
import { Move } from './move';
import {
  faBars,
  faHeart,
  faShare,
  faCircleStop,
  faFilePen,
  faPuzzlePiece,
  faChessBoard,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chesspad.pp';
  faBars: IconDefinition = faBars;
  faHeart: IconDefinition = faHeart;
  faShare: IconDefinition = faShare;
  faFilePen: IconDefinition = faFilePen;
  faPuzzlePiece: IconDefinition = faPuzzlePiece;
  faChessBoard: IconDefinition = faChessBoard;
  faCircleStop: IconDefinition = faCircleStop;

  githubUrl: string = 'https://github.com/UndefinedOnGitHub/chesspad-pp';

  constructor() {}
}
