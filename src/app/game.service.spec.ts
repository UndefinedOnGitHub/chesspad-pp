import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { Move } from './move';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('makeMove', () => {
    it('should make a valid move', () => {
      const moveResponse = service.makeMove(new Move('e4'));
      expect(moveResponse.sucess).toBeTruthy();
    });

    it('should make an invalid move', () => {
      const moveResponse = service.makeMove(new Move('e1'));
      expect(moveResponse.sucess).toBeFalsy();
    });

    it('should make a valid series of moves', () => {
      const moves = ['e4', 'e5', 'Nf3', 'Nf6'].forEach((m) => {
        const moveResponse = service.makeMove(new Move(m));
        expect(moveResponse.sucess).toBeTruthy();
      });
    });
  });
});
