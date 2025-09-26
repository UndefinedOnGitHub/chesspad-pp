
import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PuzzleService } from './puzzle.service';
import { MatDialogModule } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';

describe('PuzzleService', () => {
  let service: PuzzleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(PuzzleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
