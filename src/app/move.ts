const PieceMap: { [index: string]: any } = {
  K: '♚',
  Q: '♛',
  R: '♜',
  B: '♝',
  N: '♞',
  // p: "♙",
};

enum MovePiece {
  King = 'K',
  Queen = 'Q',
  Rook = 'R',
  Bishop = 'B',
  Knight = 'N',
  Pawn = '',
}

export class Move {
  // Move Extraction Regular Expression
  #breakdownRegex =
    /^([NBRQK])?([a-h])?([1-8])?(x)?([a-h])([1-8])(=?[NBRQK])?([+#])?$/i;
  #breakdownCaptureRegex =
    /^(?<piece>[NBRQK])?(?<sourceColumn>[a-h])?(?<sourceRow>[1-8])?(?<take>x)?(?<column>[a-h])(?<row>[1-8])(?<promotionPiece>=?[NBRQK])?(?<additional>[+#])?$/i;

  // Define move components
  piece: string | null = null;
  sourceColumn: string | null = null;
  sourceRow: string | null = null;
  column: string | null = null;
  row: string | null = null;
  castle: string | null = null;
  promotionPiece: string | null = null;
  take: boolean = false;
  check: boolean = false;

  // Flag to show the button is active
  active: boolean = false;

  // Array for holding the history of the move construction
  // this allows for stepping back through the changes
  history: Move[] = [];

  constructor(moveString: string | null = null) {
    if (moveString) {
      this.fromString(moveString);
    }
  }

  allPositions(): any[] {
    return [
      this.piece,
      this.sourceColumn,
      this.sourceRow,
      this.column,
      this.row,
      this.castle,
      this.promotionPiece,
      this.take,
      this.check,
    ];
  }

  clear(excludeHistory: boolean = false): void {
    this.piece = null;
    this.column = null;
    this.row = null;
    this.sourceColumn = null;
    this.sourceRow = null;
    this.castle = null;
    this.promotionPiece = null;

    this.take = false;
    this.check = false;

    if (!excludeHistory) {
      this.history = [];
    }
  }

  isEmpty(): boolean {
    return !this.allPositions().some((i) => !!i);
  }

  clone() {
    var cloneObj = new Move() as any;
    for (var attribut in this) {
      cloneObj[attribut] = this[attribut];
    }
    return cloneObj;
  }

  storeMove() {
    this.history.push(this.clone());
  }

  valid(): boolean {
    if (this.castle) return true;
    return !!this.column && !!this.row;
  }

  subtractMove() {
    if (this.check) {
      this.check = false;
    } else if (this.row) {
      this.row = null;
    } else if (this.column) {
      this.column = null;
    } else if (this.take) {
      this.take = false;
    } else if (this.sourceRow) {
      this.sourceRow = null;
    } else if (this.sourceColumn) {
      this.sourceColumn = null;
    } else if (this.piece) {
      this.piece = null;
    }
  }

  setPiece(piece: string): void {
    this.storeMove();
    this.piece = piece;
    this.castle = null;
  }
  setSource(source: string, location: 'row' | 'column' = 'column'): void {
    this.storeMove();
    if (location == 'column') {
      this.sourceColumn = source;
    } else if (location == 'row') {
      this.sourceRow = source;
    }
    this.castle = null;
  }
  setCol(col: string): void {
    this.storeMove();
    this.column = col;
    this.castle = null;
  }
  setRow(row: string): void {
    this.storeMove();
    this.row = row;
    this.castle = null;
  }
  setTake(): void {
    this.storeMove();
    this.take = !this.take;
    this.castle = null;
  }
  setCheck(): void {
    this.storeMove();
    this.check = !this.check;
  }
  setCastle(direction: 'O-O' | 'O-O-O'): void {
    this.storeMove();
    this.clear(true);
    this.castle = direction;
  }
  setPromotion(piece: string): void {
    this.storeMove();
    this.promotionPiece = piece;
    this.castle = null;
  }

  fromString(moveString: string): Move {
    this.clear();

    if (moveString.includes('O-O') || moveString.includes('O-O-O')) {
      this.castle = moveString;
      return this;
    }

    const [
      piece,
      sourceColumn,
      sourceRow,
      take,
      column,
      row,
      promotionPiece,
      additional,
    ]: string[] | undefined[] =
      this.#breakdownRegex.exec(moveString)?.slice(1, 9) || [];

    this.piece = piece;
    this.sourceColumn = sourceColumn;
    this.sourceRow = sourceRow;
    this.take = take == 'x';
    this.column = column;
    this.row = row;
    this.promotionPiece = promotionPiece?.replace('=', '');

    return this;
  }

  toString(withSymbols: boolean = false): string {
    if (this.isEmpty()) return '';
    if (this.castle) return this.castle;

    const emptyPlaceholder = '';
    let piece;
    let promotionPiece;
    if (withSymbols) {
      piece = PieceMap[this.piece || ''] || this.piece || emptyPlaceholder;
      const promotionTry =
        PieceMap[this.promotionPiece || ''] || this.promotionPiece;
      promotionPiece = promotionTry ? `=${promotionTry}` : '';
    } else {
      piece = this.piece || emptyPlaceholder;
      promotionPiece = this.promotionPiece ? `=${this.promotionPiece}` : '';
    }

    const sourceColumn = this.sourceColumn || emptyPlaceholder;
    const sourceRow = this.sourceRow || emptyPlaceholder;
    const take = this.take ? 'x' : '';
    const column = this.column || emptyPlaceholder;
    const row = this.row || emptyPlaceholder;
    const check = this.check ? '+' : '';

    return `${piece}${sourceColumn}${sourceRow}${take}${column}${row}${check}${promotionPiece}`;
  }
}
