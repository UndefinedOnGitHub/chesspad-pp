import { Component } from '@angular/core';

import { NotepadComponent } from '../notepad/notepad.component';
import { KeyboardComponent } from '../../keyboards/components/keyboard/keyboard.component';
import { MatCardModule } from '@angular/material/card';
import { GameService } from '@services/game.service';
import { NotifyService } from '@services/notify.service';
import {
  faBars,
  faHeart,
  faShare,
  faCircleStop,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { FinishGameDialogComponent } from '@components/finish-game-dialog/finish-game-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    NotepadComponent,
    KeyboardComponent,
    MatButtonModule
],
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
    this.game.fetchGame();
  }

  onFinish() {
    const dialogRef = this.dialog.open(FinishGameDialogComponent, {
      data: { pgn: this.game.game.pgn(), game: this.game.game },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.new) {
        this.game.clearGame();
      }
    });
  }

  onClear() {
    this.game.clearGame();
    this.notify.warn('Game Cleared');
  }
}
