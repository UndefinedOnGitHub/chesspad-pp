import { TestBed } from '@angular/core/testing';

import { GameReviewService } from './game-review.service';
import { HttpClientModule } from '@angular/common/http';

describe('GameReviewService', () => {
  let service: GameReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(GameReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
