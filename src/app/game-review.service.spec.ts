import { TestBed } from '@angular/core/testing';

import { GameReviewService } from './game-review.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

describe('GameReviewService', () => {
  let service: GameReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule],
    });
    service = TestBed.inject(GameReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
