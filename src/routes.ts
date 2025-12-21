import { GameComponent } from '@components/game/game.component';
import { PuzzlesComponent } from '@components/puzzles/puzzles.component';
import { GameReviewComponent } from '@components/game-review/game-review.component';
import { TutorialComponent } from '@components/tutorial/tutorial.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'puzzles', component: PuzzlesComponent },
  { path: 'games', component: GameReviewComponent },
  { path: 'tutorial', component: TutorialComponent },
];