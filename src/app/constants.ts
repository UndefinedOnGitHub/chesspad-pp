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
	// "king" | "queen" | "rook" | "knight" | "bishop" | "pawn"
	key: string;
	type: string;
	icon?: IconDefinition;
	// "K" | "Q" | "R" | "N" | "B" | ""
	symbol: string;
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
