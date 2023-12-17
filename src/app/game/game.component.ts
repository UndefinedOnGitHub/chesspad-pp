import { Component } from '@angular/core';
import { Move } from '../move';
import { GameService } from '../game.service';
import { NotifyService } from '../notify.service';
import {
  faBars,
  faHeart,
  faShare,
  faCircleStop,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { FinishGameDialogComponent } from '../finish-game-dialog/finish-game-dialog.component';

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
  game: GameService;
  notify: NotifyService;

  constructor(
    notify: NotifyService,
    game: GameService,
    public dialog: MatDialog,
  ) {
    this.notify = notify;
    this.game = game;
    if (this.game.isGameStored()) {
      this.game.fetchGame();
    }
  }

  onFinish() {
    const dialogRef = this.dialog.open(FinishGameDialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  onClear() {
    this.game.clearGame();
    this.notify.warn('Game Cleared');
  }
}
