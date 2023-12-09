class MoveHistory {
	move : "piece" | "source" | "" | undefined;
	constructor(move:string) {
		// this.move = move;
	}
}

export class Move {
	piece: string | null = null;
	source: string | null = null;
	column: string | null = null;
	row: string | null = null;
	castle: string | null = null;

	take: boolean = false;
	check: boolean = false;
	// Todo Castle - short / long
	history: any[] = [];
	constructor() {
		this.history = []
	}

	clear() : void {
		this.piece = null;
		this.column = null;
		this.row = null;
		this.source = null;
		this.castle = null;
		this.take = false;
		this.check = false;
		this.history = []
	}

	output() : string {
		if (this.castle) {
			return this.castle;
		}
		const piece = this.piece || "";
		const source = this.source || "";
		const take = this.take ? "x" : "";
		const column = this.column || "";
		const row = this.row || "";
		return `${piece}${source}${take}${column}${row}`
	}

	valid() : boolean {
		return !!this.column && !!this.row
	}

	setPiece(piece : string) : void {
		this.piece = piece
		this.castle = null;
	}
	setSource(source : string) : void {
		this.source = source
		this.castle = null;
	}
	setCol(col : string) : void {
		this.column = col
		this.castle = null;
	}
	setRow(row : string) : void {
		this.row = row
		this.castle = null;
	}
	setTake() : void {
		this.take = !this.take
		this.castle = null;
	}
	setCastle(direction : "O-O" | "O-O-O") : void {
		this.castle = direction
	}
}
