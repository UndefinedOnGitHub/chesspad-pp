import { Injectable } from '@angular/core';

export enum GameResult {
  Win = 1,
  Lose = 0,
  Draw = 0.5,
}

@Injectable({
  providedIn: 'root',
})

/**
 * CURRENTLY UNUSED
 *
 * This will be used as a service for quick elo change calculations.
 * I found how to do the calculation online and wanted to jot down the funtions.
 */
export class EloCalculatorService {
  getRatingDelta(
    activePlayerElo: number,
    opponentRating: number,
    gameResult: GameResult,
  ) {
    var myChanceToWin =
      1 / (1 + Math.pow(10, (opponentRating - activePlayerElo) / 400));

    return Math.round(32 * (gameResult - myChanceToWin));
  }

  getNewRating(
    activePlayerElo: number,
    opponentRating: number,
    gameResult: GameResult,
  ): number {
    if (!Object.values(GameResult).includes(gameResult)) {
      throw new Error('Not a valid game reuslt');
    }
    return (
      activePlayerElo +
      this.getRatingDelta(activePlayerElo, opponentRating, gameResult)
    );
  }
}
