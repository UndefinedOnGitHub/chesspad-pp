import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ChessWebsiteApiService } from './chess-website-api.service';

describe('ChessWebsiteApiService', () => {
  let service: ChessWebsiteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ChessWebsiteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
