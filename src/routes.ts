import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@components/pages/game/game.component').then((m) => m.GameComponent),
  },
  {
    path: 'puzzles',
    loadComponent: () =>
      import('@components/pages/puzzles/puzzles.component').then((m) => m.PuzzlesComponent),
  },
  {
    path: 'games',
    loadComponent: () =>
      import('@components/pages/game-review/game-review.component').then((m) => m.GameReviewComponent),
  },
  {
    path: 'tutorial',
    loadComponent: () =>
      import('@components/pages/tutorial/tutorial.component').then((m) => m.TutorialComponent),
  },
];
