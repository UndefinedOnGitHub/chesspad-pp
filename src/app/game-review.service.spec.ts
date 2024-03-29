import { TestBed } from '@angular/core/testing';

import { GameReviewService } from './game-review.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('GameReviewService', () => {
  let service: GameReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
    });
    service = TestBed.inject(GameReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
