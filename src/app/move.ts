export class Move {
  piece: string | null = null;
  source: string | null = null;
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

  clear(excludeHistory: boolean = false): void {
    this.piece = null;
    this.column = null;
    this.row = null;
    this.source = null;
    this.castle = null;
    this.promotionPiece = null;
    this.take = false;
    this.check = false;
    if (!excludeHistory) {
      this.history = [];
    }
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
    const emptyPlaceholder = '';
    if (this.castle) {
      return this.castle;
    }
    const piece = this.piece || emptyPlaceholder;
    const source = this.source || emptyPlaceholder;
    const take = this.take ? 'x' : '';
    const column = this.column || emptyPlaceholder;
    const row = this.row || emptyPlaceholder;
    const check = this.check ? '+' : '';
    const promotionPiece = this.promotionPiece ? `=${this.promotionPiece}` : '';
    return `${piece}${source}${take}${column}${row}${check}${promotionPiece}`;
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
    } else if (this.source) {
      this.source = null;
    } else if (this.piece) {
      this.piece = null;
    }
  }

  // Super naive: DO NOT USE
  extractFromString(moveString : string) : Move {
    this.clear();
    const stringPieces = moveString.split("")
    this.piece = stringPieces[0]
    this.column = stringPieces[1]
    this.row = stringPieces[2]
    return this;
  }

  setPiece(piece: string): void {
    this.storeMove();
    this.piece = piece;
    this.castle = null;
  }
  setSource(source: string): void {
    this.storeMove();
    this.source = source;
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
