import { TestBed } from '@angular/core/testing';

import { PuzzleService } from './puzzle.service';
import { HttpClientModule } from '@angular/common/http';

describe('PuzzleService', () => {
  let service: PuzzleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(PuzzleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
