// Angular Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Font Awesome
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
import { GameComponent } from './game/game.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { GameReviewComponent } from './game-review/game-review.component';
// Routing
import { RouterModule, Routes } from '@angular/router';
import { TutorialComponent } from './tutorial/tutorial.component';
export const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'puzzles', component: PuzzlesComponent },
  { path: 'games', component: GameReviewComponent },
  { path: 'tutorial', component: TutorialComponent },
];

@NgModule({
  imports: [
    BrowserModule,
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
})
export class AppModule {}
