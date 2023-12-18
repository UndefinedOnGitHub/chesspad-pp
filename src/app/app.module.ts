import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyboardButtonComponent } from './keyboard-button/keyboard-button.component';
import { NotepadComponent } from './notepad/notepad.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MoveDisplayComponent } from './move-display/move-display.component';
import { GameComponent } from './game/game.component';
import { FinishGameDialogComponent } from './finish-game-dialog/finish-game-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FinishGameDialogComponent,
    GameComponent,
    KeyboardButtonComponent,
    KeyboardComponent,
    MoveDisplayComponent,
    NotepadComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // Fonts / Icons
    FontAwesomeModule,
    // Angular Material Modules
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
