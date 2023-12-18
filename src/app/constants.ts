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
} from '@fortawesome/free-solid-svg-icons';

export enum PieceSymbol {
  King = "K",
  Queen = "Q",
  Rook = "R",
  Bishop = "B",
  Knight = "N",
  Pawn = ""
}

export interface Piece {
  key: 'king' | 'queen' | 'rook' | 'knight' | 'bishop' | 'pawn';
  type: 'piece';
  icon?: IconDefinition;
  symbol: PieceSymbol;
}
export const King: Piece = {
  type: 'piece',
  key: 'king',
  icon: faChessKing,
  symbol: PieceSymbol.King,
};
export const Queen: Piece = {
  type: 'piece',
  key: 'queen',
  icon: faChessQueen,
  symbol: PieceSymbol.Queen,
};
export const Rook: Piece = {
  type: 'piece',
  key: 'rook',
  icon: faChessRook,
  symbol: PieceSymbol.Rook,
};
export const Knight: Piece = {
  type: 'piece',
  key: 'knight',
  icon: faChessKnight,
  symbol: PieceSymbol.Knight,
};
export const Bishop: Piece = {
  type: 'piece',
  key: 'bishop',
  icon: faChessBishop,
  symbol: PieceSymbol.Bishop,
};
export const Pawn: Piece = {
  type: 'piece',
  key: 'pawn',
  icon: faChessPawn,
  symbol: PieceSymbol.Pawn,
};
export const Pieces: Piece[] = [King, Queen, Rook, Knight, Bishop, Pawn];

//
// Rows: Definitions of the rows
//

export enum RowSymbol {
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
}

export interface Row {
  key:
    | 'row_1'
    | 'row_2'
    | 'row_3'
    | 'row_4'
    | 'row_5'
    | 'row_6'
    | 'row_7'
    | 'row_8';
  type: 'row';
  symbol: RowSymbol;
}

export const Row1: Row = { type: 'row', key: 'row_1', symbol: RowSymbol.One };
export const Row2: Row = { type: 'row', key: 'row_2', symbol: RowSymbol.Two };
export const Row3: Row = { type: 'row', key: 'row_3', symbol: RowSymbol.Three };
export const Row4: Row = { type: 'row', key: 'row_4', symbol: RowSymbol.Four };
export const Row5: Row = { type: 'row', key: 'row_5', symbol: RowSymbol.Five };
export const Row6: Row = { type: 'row', key: 'row_6', symbol: RowSymbol.Six };
export const Row7: Row = { type: 'row', key: 'row_7', symbol: RowSymbol.Seven };
export const Row8: Row = { type: 'row', key: 'row_8', symbol: RowSymbol.Eight };

export const Rows: Row[] = [Row1, Row2, Row3, Row4, Row5, Row6, Row7, Row8];

//
// Columns: Definitions of the rows
//

export enum ColumnSymbol {
  A = "a",
  B = "b",
  C = "c",
  D = "d",
  E = "e",
  F = "f",
  G = "g",
  H = "h",
}

export interface Column {
  key:
    | 'col_a'
    | 'col_b'
    | 'col_c'
    | 'col_d'
    | 'col_e'
    | 'col_f'
    | 'col_g'
    | 'col_h';
  type: 'column';
  symbol: ColumnSymbol;
}

export const Column1: Column = { type: 'column', key: 'col_a', symbol: ColumnSymbol.A };
export const Column2: Column = { type: 'column', key: 'col_b', symbol: ColumnSymbol.B };
export const Column3: Column = { type: 'column', key: 'col_c', symbol: ColumnSymbol.C };
export const Column4: Column = { type: 'column', key: 'col_d', symbol: ColumnSymbol.D };
export const Column5: Column = { type: 'column', key: 'col_e', symbol: ColumnSymbol.E };
export const Column6: Column = { type: 'column', key: 'col_f', symbol: ColumnSymbol.F };
export const Column7: Column = { type: 'column', key: 'col_g', symbol: ColumnSymbol.G };
export const Column8: Column = { type: 'column', key: 'col_h', symbol: ColumnSymbol.H };

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
