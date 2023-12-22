import { TestBed } from '@angular/core/testing';

import { ChessInterfaceService } from './chess-interface.service';

describe('ChessInterfaceService', () => {
  let service: ChessInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChessInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
