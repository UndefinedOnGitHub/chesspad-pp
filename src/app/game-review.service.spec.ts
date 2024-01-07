import { TestBed } from '@angular/core/testing';

import { GameReviewService } from './game-review.service';

describe('GameReviewService', () => {
  let service: GameReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
