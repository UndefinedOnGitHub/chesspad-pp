import { TestBed } from '@angular/core/testing';

import { GameStorageManagerService } from './game-storage-manager.service';

describe('GameStorageManagerService', () => {
  let service: GameStorageManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStorageManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
