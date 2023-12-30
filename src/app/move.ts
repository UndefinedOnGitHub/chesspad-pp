import { KeyboardButton } from './button';

const PieceMap: { [index: string]: any } = {
  K: '♚',
  Q: '♛',
  R: '♜',
  B: '♝',
  N: '♞',
  // p: "♙",
};

// enum MovePiece {
//   King = 'K',
//   Queen = 'Q',
//   Rook = 'R',
//   Bishop = 'B',
//   Knight = 'N',
//   Pawn = '',
// }

class MoveHistory {
  move: Move;
  moveAttribute: string;
  button: KeyboardButton | undefined;
  constructor(
    move: Move,
    moveAttribute: string,
    button: KeyboardButton | undefined = undefined,
  ) {
    this.move = move;
    this.moveAttribute = moveAttribute;
    this.button = button;
  }
}

export class Move {
  // Move Extraction Regular Expressions
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
  history: MoveHistory[] = [];

  constructor(moveString: string | null = null) {
    if (moveString) this.fromString(moveString);
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
    return !this.#allPositions().some((i) => !!i);
  }

  clone(): Move {
    var cloneObj = new Move() as any;
    for (var attribut in this) {
      cloneObj[attribut] = this[attribut];
    }
    return cloneObj;
  }

  lastMove(backIdx: number = 0): MoveHistory | undefined {
    return this.history[this.history.length - 1 - backIdx];
  }

  valid(): boolean {
    if (this.castle) return true;
    return !!this.column && !!this.row;
  }

  // Function to step back through the move components
  subtractMove(): void {
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

  // Functions to set the move components
  setPiece(pieceBtn: KeyboardButton): void {
    this.#storeMove('piece', pieceBtn);
    this.piece = pieceBtn.symbol;
    this.castle = null;
  }
  setSource(
    sourceBtn: KeyboardButton,
    location: 'row' | 'column' = 'column',
  ): void {
    this.#storeMove(
      location == 'row' ? 'sourceRow' : 'sourceColumn',
      sourceBtn,
    );
    if (location == 'column') {
      this.sourceColumn = sourceBtn.symbol;
    } else if (location == 'row') {
      this.sourceRow = sourceBtn.symbol;
    }
    this.castle = null;
  }
  setCol(colBtn: KeyboardButton): void {
    this.#storeMove('column', colBtn);
    this.column = colBtn.symbol;
    this.castle = null;
  }
  setRow(rowBtn: KeyboardButton): void {
    this.#storeMove('row', rowBtn);
    this.row = rowBtn.symbol;
    this.castle = null;
  }
  setTake(): void {
    this.#storeMove('take');
    this.take = !this.take;
    this.castle = null;
  }
  setCheck(): void {
    this.#storeMove('check');
    this.check = !this.check;
  }
  setCastle(direction: 'O-O' | 'O-O-O'): void {
    this.#storeMove('castle');
    this.clear(true);
    this.castle = direction;
  }
  setPromotion(pieceBtn: KeyboardButton): void {
    this.#storeMove('promotionPiece', pieceBtn);
    this.promotionPiece = pieceBtn.symbol;
    this.castle = null;
  }

  // Functions to convert between move and strings
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

    const piece = this.#toPieceString(withSymbols) || emptyPlaceholder;
    const promotionPiece =
      this.#toPromotionPieceString(withSymbols) || emptyPlaceholder;
    const sourceColumn = this.sourceColumn || emptyPlaceholder;
    const sourceRow = this.sourceRow || emptyPlaceholder;
    const take = this.take ? 'x' : '';
    const column = this.column || emptyPlaceholder;
    const row = this.row || emptyPlaceholder;
    const check = this.check ? '+' : '';

    return `${piece}${sourceColumn}${sourceRow}${take}${column}${row}${check}${promotionPiece}`;
  }

  #toPieceString(withSymbols: boolean): string | undefined {
    let piece;
    if (withSymbols) {
      piece = PieceMap[this.piece || ''] || this.piece;
    } else {
      piece = this.piece;
    }
    return piece;
  }

  #toPromotionPieceString(withSymbols: boolean): string | undefined {
    let promotionPiece;
    if (withSymbols) {
      const pp = PieceMap[this.promotionPiece || ''] || this.promotionPiece;
      promotionPiece = pp ? `=${pp}` : undefined;
    } else {
      promotionPiece = this.promotionPiece
        ? `=${this.promotionPiece}`
        : undefined;
    }
    return promotionPiece;
  }

  #allPositions(): any[] {
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

  #storeMove(
    moveAttribute: string,
    moveButton: KeyboardButton | undefined = undefined,
  ): void {
    this.history.push(new MoveHistory(this.clone(), moveAttribute, moveButton));
  }
}
