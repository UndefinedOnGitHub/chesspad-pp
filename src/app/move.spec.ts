import { Move } from './move';

describe('Move', () => {
  it('should create an instance', () => {
    expect(new Move()).toBeTruthy();
  });

  describe('fromString', () => {
    const expectFromString = (moveString: string, obj: any) => {
      expect(new Move(moveString)).toEqual(jasmine.objectContaining(obj));
    };

    it('should extract a Pawn move', () => {
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

    it('should extract a Pawn take move', () => {
      expectFromString('fxe4', {
        piece: undefined,
        column: 'e',
        sourceColumn: 'f',
        row: '4',
        take: true,
      });

      expectFromString('hxg5', {
        piece: undefined,
        column: 'g',
        sourceColumn: 'h',
        row: '5',
        take: true,
      });
    });

    it('should extract a Pawn promotion', () => {
      expectFromString('e8=Q', {
        piece: undefined,
        column: 'e',
        row: '8',
        promotionPiece: 'Q',
      });

      expectFromString('h1=R', {
        piece: undefined,
        column: 'h',
        row: '1',
        promotionPiece: 'R',
      });
    });

    it('should extract a Bishop move', () => {
      expectFromString('Be4', {
        piece: 'B',
        column: 'e',
        row: '4',
      });

      expectFromString('Be5', {
        piece: 'B',
        column: 'e',
        row: '5',
      });

      expectFromString('Bxe5', {
        piece: 'B',
        column: 'e',
        row: '5',
        take: true,
      });
    });

    it('should extract a Knight move', () => {
      expectFromString('Nc6', {
        piece: 'N',
        column: 'c',
        row: '6',
      });

      expectFromString('Nh4', {
        piece: 'N',
        column: 'h',
        row: '4',
      });

      expectFromString('Nxh4', {
        piece: 'N',
        column: 'h',
        row: '4',
        take: true,
      });

      expectFromString('Ncxd4', {
        piece: 'N',
        column: 'd',
        row: '4',
        sourceColumn: 'c',
        take: true,
      });

      expectFromString('N3xd4', {
        piece: 'N',
        column: 'd',
        row: '4',
        sourceRow: '3',
        take: true,
      });

      expectFromString('Ned4', {
        piece: 'N',
        column: 'd',
        row: '4',
        sourceColumn: 'e',
      });
    });

    it('should extract a Rook move', () => {
      expectFromString('Re4', {
        piece: 'R',
        column: 'e',
        row: '4',
      });

      expectFromString('Re5', {
        piece: 'R',
        column: 'e',
        row: '5',
      });

      expectFromString('Rxe5', {
        piece: 'R',
        column: 'e',
        row: '5',
        take: true,
      });

      expectFromString('Raxe5', {
        piece: 'R',
        column: 'e',
        row: '5',
        sourceColumn: 'a',
        take: true,
      });

      expectFromString('R3xe5', {
        piece: 'R',
        column: 'e',
        row: '5',
        sourceRow: '3',
        take: true,
      });
    });

    it('should extract a Queen move', () => {
      expectFromString('Qe4', {
        piece: 'Q',
        column: 'e',
        row: '4',
      });

      expectFromString('Qe5', {
        piece: 'Q',
        column: 'e',
        row: '5',
      });

      expectFromString('Qxe5', {
        piece: 'Q',
        column: 'e',
        row: '5',
        take: true,
      });

      expectFromString('Qaxe5', {
        piece: 'Q',
        column: 'e',
        row: '5',
        sourceColumn: 'a',
        take: true,
      });

      expectFromString('Q4xe5', {
        piece: 'Q',
        column: 'e',
        row: '5',
        sourceRow: '4',
        take: true,
      });
    });

    it('should extract a King move', () => {
      expectFromString('Ke7', {
        piece: 'K',
        column: 'e',
        row: '7',
      });

      expectFromString('Ke2', {
        piece: 'K',
        column: 'e',
        row: '2',
      });
    });

    it('should extract a Castle move', () => {
      expectFromString('O-O', {
        castle: 'O-O',
      });

      expectFromString('O-O-O', {
        castle: 'O-O-O',
      });
    });
  });
});
