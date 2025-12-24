import { TestBed } from '@angular/core/testing';

import { BaseGameService } from './base-game.service';
import { Move } from '../models/move';

describe('BaseGameService', () => {
  let service: BaseGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fail when validateMove is not set', () => {
    expect(service).toBeTruthy();

    const moveResponse = service.makeMove(new Move('e4'));
    expect(moveResponse.success).toBeFalsy();
  });

  describe('makeMove', () => {
    beforeEach(() => {
      service.validateMove = () => {};
    });

    it('should make a valid move', () => {
      const moveResponse = service.makeMove(new Move('e4'));
      expect(moveResponse.success).toBeTruthy();
    });
  });
});
