import { TestBed } from '@angular/core/testing';

import {
  EloCalculatorService,
  GameResult,
} from '@services/elo-calculator.service';

describe('EloCalculatorService', () => {
  let service: EloCalculatorService;
  let targetUserElo: number;
  let opponentUserElo: number;

  beforeEach(() => {
    targetUserElo = 1800;
    opponentUserElo = 1700;

    TestBed.configureTestingModule({});
    service = TestBed.inject(EloCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getNewRating', () => {
    it('should throw exception when bad input is provided', () => {
      expect(function () {
        service.getNewRating(targetUserElo, opponentUserElo, 1 + 3);
      }).toThrowMatching(function (thrown) {
        return thrown.message === 'Not a valid game reuslt';
      });
    });

    it('should calculate elo when the target user wins', () => {
      const userNewRating = service.getNewRating(
        targetUserElo,
        opponentUserElo,
        GameResult.Win,
      );
      const opponentNewRating = service.getNewRating(
        opponentUserElo,
        targetUserElo,
        GameResult.Lose,
      );
      // Check consistant Calculation
      expect(userNewRating).toEqual(1812);
      expect(opponentNewRating).toEqual(1688);
      // Check Ratings move in correct direction
      expect(userNewRating).toBeGreaterThan(targetUserElo);
      expect(opponentNewRating).toBeLessThan(opponentUserElo);
    });

    it('should calculate elo when the target user loses', () => {
      const userNewRating = service.getNewRating(
        targetUserElo,
        opponentUserElo,
        GameResult.Lose,
      );
      const opponentNewRating = service.getNewRating(
        opponentUserElo,
        targetUserElo,
        GameResult.Win,
      );
      // Check consistant Calculation
      expect(userNewRating).toEqual(1780);
      expect(opponentNewRating).toEqual(1720);
      // Check Ratings move in correct direction
      expect(userNewRating).toBeLessThan(targetUserElo);
      expect(opponentNewRating).toBeGreaterThan(opponentUserElo);
    });

    it('should calculate elo when the players draw', () => {
      const userNewRating = service.getNewRating(
        targetUserElo,
        opponentUserElo,
        GameResult.Draw,
      );
      const opponentNewRating = service.getNewRating(
        opponentUserElo,
        targetUserElo,
        GameResult.Draw,
      );

      // Check consistant Calculation
      expect(userNewRating).toEqual(1796);
      expect(opponentNewRating).toEqual(1704);
      // Check Ratings move in correct direction
      expect(userNewRating).toBeLessThan(targetUserElo);
      expect(opponentNewRating).toBeGreaterThan(opponentUserElo);
    });
  });
});
