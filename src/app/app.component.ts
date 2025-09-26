import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import {
  faBars,
  faShare,
  faFilePen,
  faPuzzlePiece,
  faChessBoard,
  faMagnifyingGlass,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

interface SideBarAction {
  routerLink: string;
  icon: IconDefinition;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatSidenavModule, RouterModule, MatButtonModule, FontAwesomeModule],
})
export class AppComponent {
  faBars: IconDefinition = faBars;
  faShare: IconDefinition = faShare;

  githubUrl: string = 'https://github.com/UndefinedOnGitHub/chesspad-pp';

  sideBarActions: SideBarAction[] = [
    { routerLink: '/tutorial', icon: faMagnifyingGlass, text: 'Tutorial' },
    { routerLink: '/', icon: faFilePen, text: 'Notepad' },
    { routerLink: '/puzzles', icon: faPuzzlePiece, text: 'Puzzle' },
    { routerLink: '/games', icon: faChessBoard, text: 'Game' },
  ];

  constructor() {}
}
