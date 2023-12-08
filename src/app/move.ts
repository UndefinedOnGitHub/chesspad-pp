export class Move {
	piece: string | null = null;
	source: string | null = null;
	desitnationCol: string | null = null;
	desitnationRow: string | null = null;

	take: boolean = false;
	check: boolean = false;
	// Todo Castle - short / long
	constructor() {
		
	}

	clear() : void {
		this.piece = null;
		this.desitnationCol = null;
		this.desitnationRow = null;
		this.source = null;
		this.take = false;
		this.check = false;
	}

	output() : string {
		const piece = this.piece || "";
		const desitnationCol = this.desitnationCol || "";
		const desitnationRow = this.desitnationRow || "";
		const source = this.source || "";
		const take = this.take ? "x" : "";
		return `${piece}${source}${take}${desitnationCol}${desitnationRow}`
	}
}
