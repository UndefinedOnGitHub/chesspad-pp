//
// Pieces: Definitions of the pieces
//

import {
	faChessKing,
	faChessQueen,
	faChessRook,
	faChessBishop,
	faChessKnight,
	faChessPawn,
	IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export interface Piece {
	key: "king" | "queen" | "rook" | "knight" | "bishop" | "pawn";
	type: "piece";
	icon?: IconDefinition;
	symbol: "K" | "Q" | "R" | "N" | "B" | "";
}
export const King: Piece = {
	type: "piece",
	key: "king",
	icon: faChessKing,
	symbol: "K",
};
export const Queen: Piece = {
	type: "piece",
	key: "queen",
	icon: faChessQueen,
	symbol: "Q",
};
export const Rook: Piece = {
	type: "piece",
	key: "rook",
	icon: faChessRook,
	symbol: "R",
};
export const Knight: Piece = {
	type: "piece",
	key: "knight",
	icon: faChessKnight,
	symbol: "N",
};
export const Bishop: Piece = {
	type: "piece",
	key: "bishop",
	icon: faChessBishop,
	symbol: "B",
};
export const Pawn: Piece = {
	type: "piece",
	key: "pawn",
	icon: faChessPawn,
	symbol: "",
};
export const Pieces: Piece[] = [King, Queen, Rook, Knight, Bishop, Pawn];

//
// Rows: Definitions of the rows
//

export interface Row {
	key:
		| "row_1"
		| "row_2"
		| "row_3"
		| "row_4"
		| "row_5"
		| "row_6"
		| "row_7"
		| "row_8";
	type: "row";
	symbol: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
}

export const Row1: Row = { type: "row", key: "row_1", symbol: "1" };
export const Row2: Row = { type: "row", key: "row_2", symbol: "2" };
export const Row3: Row = { type: "row", key: "row_3", symbol: "3" };
export const Row4: Row = { type: "row", key: "row_4", symbol: "4" };
export const Row5: Row = { type: "row", key: "row_5", symbol: "5" };
export const Row6: Row = { type: "row", key: "row_6", symbol: "6" };
export const Row7: Row = { type: "row", key: "row_7", symbol: "7" };
export const Row8: Row = { type: "row", key: "row_8", symbol: "8" };

export const Rows: Row[] = [Row1, Row2, Row3, Row4, Row5, Row6, Row7, Row8];

//
// Columns: Definitions of the rows
//

export interface Column {
	key:
		| "col_a"
		| "col_b"
		| "col_c"
		| "col_d"
		| "col_e"
		| "col_f"
		| "col_g"
		| "col_h";
	type: "column";
	symbol: "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
}

export const Column1: Column = { type: "column", key: "col_a", symbol: "a" };
export const Column2: Column = { type: "column", key: "col_b", symbol: "b" };
export const Column3: Column = { type: "column", key: "col_c", symbol: "c" };
export const Column4: Column = { type: "column", key: "col_d", symbol: "d" };
export const Column5: Column = { type: "column", key: "col_e", symbol: "e" };
export const Column6: Column = { type: "column", key: "col_f", symbol: "f" };
export const Column7: Column = { type: "column", key: "col_g", symbol: "g" };
export const Column8: Column = { type: "column", key: "col_h", symbol: "h" };

export const Columns: Column[] = [
	Column1,
	Column2,
	Column3,
	Column4,
	Column5,
	Column6,
	Column7,
	Column8,
];
