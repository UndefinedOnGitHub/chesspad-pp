import { TestBed } from '@angular/core/testing';

import { ChessWebsiteApiService } from './chess-website-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('ChessWebsiteApiService', () => {
  let service: ChessWebsiteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ChessWebsiteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
