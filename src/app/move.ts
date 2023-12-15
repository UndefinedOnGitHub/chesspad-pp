export class Move {
  piece: string | null = null;
  sourceColumn: string | null = null;
  sourceRow: string | null = null;
  column: string | null = null;
  row: string | null = null;
  castle: string | null = null;
  promotionPiece: string | null = null;

  take: boolean = false;
  check: boolean = false;
  history: Move[] = [];
  constructor() {
    this.history = [];
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

  output(): string {
    if (this.isEmpty()) {
      return ' . ';
    }

    const emptyPlaceholder = '';
    if (this.castle) {
      return this.castle;
    }
    const piece = this.piece || emptyPlaceholder;
    const sourceColumn = this.sourceColumn || emptyPlaceholder;
    const sourceRow = this.sourceRow || emptyPlaceholder;
    const take = this.take ? 'x' : '';
    const column = this.column || emptyPlaceholder;
    const row = this.row || emptyPlaceholder;
    const check = this.check ? '+' : '';
    const promotionPiece = this.promotionPiece ? `=${this.promotionPiece}` : '';
    return `${piece}${sourceColumn}${sourceRow}${take}${column}${row}${check}${promotionPiece}`;
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

  // Super naive: DO NOT USE
  extractFromString(moveString: string): Move {
    this.clear();
    const stringPieces = moveString.split('');
    if (stringPieces.length <= 2) {
      stringPieces.unshift('');
    }
    this.piece = stringPieces[0];
    this.column = stringPieces[1];
    this.row = stringPieces[2];
    return this;
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

  toString(): string {
    return `${this.output()}`;
  }
}
