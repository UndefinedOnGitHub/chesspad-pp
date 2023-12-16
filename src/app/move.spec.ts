import { Move } from './move';

describe('Move', () => {
  it('should create an instance', () => {
    expect(new Move()).toBeTruthy();
  });

  describe('extractFromString', () => {
    let move: Move;
    beforeEach(() => {
      move = new Move();
    });

    const expectFromString = (moveString: string, obj: any) => {
      expect(move.extractFromString(moveString)).toEqual(
        jasmine.objectContaining(obj),
      );
    };

    it('should extract a pawn moves', () => {
      expectFromString('e4', {
        piece: undefined,
        column: 'e',
        row: '4',
      });

      expectFromString('e5', {
        piece: undefined,
        column: 'e',
        row: '5',
      });
    });

    it('should extract a bishop moves', () => {
      expectFromString('be4', {
        piece: 'b',
        column: 'e',
        row: '4',
      });

      expectFromString('be5', {
        piece: 'b',
        column: 'e',
        row: '5',
      });
    });
  });
});
