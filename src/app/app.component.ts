import { Component } from '@angular/core';
import { Move } from './move';
import {
  faBars,
  faShare,
  faFilePen,
  faPuzzlePiece,
  faChessBoard,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

interface SideBarAction {
  routerLink: string;
  icon: IconDefinition;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  faBars: IconDefinition = faBars;
  faShare: IconDefinition = faShare;

  githubUrl: string = 'https://github.com/UndefinedOnGitHub/chesspad-pp';

  sideBarActions : SideBarAction[] = [
    {routerLink: "/", icon: faFilePen, text: "Notepad"},
    {routerLink: "/puzzles", icon: faPuzzlePiece, text: "Puzzle"},
    {routerLink: "/games", icon: faChessBoard, text: "Game"},
  ]

  constructor() {}
}
