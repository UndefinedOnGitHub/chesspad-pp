// Angular Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Angular Material
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
// App Components
import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyboardButtonComponent } from './keyboard-button/keyboard-button.component';
import { NotepadComponent } from './notepad/notepad.component';
import { MoveDisplayComponent } from './move-display/move-display.component';
import { GameComponent } from './game/game.component';
import { FinishGameDialogComponent } from './finish-game-dialog/finish-game-dialog.component';
import { KeyboardSettingsDialogComponent } from './keyboard-settings-dialog/keyboard-settings-dialog.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { GameReviewComponent } from './game-review/game-review.component';
// Routing
import { RouterModule, Routes } from '@angular/router';
import { GameReviewSelectorDialogComponent } from './game-review-selector-dialog/game-review-selector-dialog.component';
import { TutorialComponent } from './tutorial/tutorial.component';
const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'puzzles', component: PuzzlesComponent },
  { path: 'games', component: GameReviewComponent },
  { path: 'tutorial', component: TutorialComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FinishGameDialogComponent,
    GameComponent,
    KeyboardButtonComponent,
    KeyboardComponent,
    MoveDisplayComponent,
    NotepadComponent,
    KeyboardSettingsDialogComponent,
    PuzzlesComponent,
    GameReviewComponent,
    GameReviewSelectorDialogComponent,
    TutorialComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    MatSlideToggleModule,
    MatSelectModule,
    MatSidenavModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
