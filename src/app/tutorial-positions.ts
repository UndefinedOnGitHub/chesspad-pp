import { Move } from './move';

export interface Position {
  title: string;
  move: Move;
  pgn: string;
  hint: string;
}

const pawn_move_scenario: Position = {
  title: 'Basic Pawn Move',
  hint: 'This is a common first move. Enter e4 on the keyboard. Pressing the pawn icon is optional. Click on the "e" button then press the "#" to switch to the row options. Next click on "4". Finally click on the submit button "| |".',
  move: new Move('e4'),
  pgn: `1. e4 *`,
};

const pawn_take: Position = {
  title: 'Pawn Take',
  hint: 'When a pawn takes you can make this move in 2 ways. First way is to select the source square by clicking on the "*" followed by the source column ("e"). Now that the source column is selected you can select the destination square ("d"). Next click on "x" to mark the move as a capture. With the columns selected you can click the "#" to see the rows and finally click "5" to select the destination row. The second way to enter a pawn take is to click on the source column then click on x and then click on the destination. This will move the first click to be the source and the second column to be the destination. This looks like <code>e &#8594; x &#8594; d &#8594; # &#8594; 5 &#8594; ||</code>',
  move: new Move('exd5'),
  pgn: `
[FEN "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1"]

1. exd5 *
`,
};

const pawn_promotion: Position = {
  title: 'Pawn Promotion To Queen',
  hint: 'When a pawn advances to the last rank it promotes to another peice. To enter this press the column "d" the number pad "#" then the row "8". Next press the equals sign "=" then the promotion peice "Q"',
  move: new Move('d8=Q'),
  pgn: `
[FEN "k7/3P4/7K/8/8/8/1Q6/8 w - - 0 1"]

1. d8=Q+ *
`,
};

const rook_column_move: Position = {
  title: 'Rooks On The Same Row',
  hint: 'When you have two rooks on the same row you must declare which rook is to be moved. To select the source column first click the star icon * then click the source column d. Next click the destination column e. This order does not matter. By clicking the star the keyboard then expects a source square. After selecting the column click on the # to switch to the row options and click 4.',
  move: new Move('Rde4'),
  pgn: `
[FEN "1r2k3/8/8/8/3R1R2/8/2K5/7r w - - 0 1"]

1. Rde4+ *
`,
};

const rook_row_move: Position = {
  title: 'Rooks On The Same Column',
  hint: 'When you have two rooks on the same column you must declare which rook is to be moved. Start by pressing the destination column e. Then switch to the row options. Here click the source option selector then the source row. Next click the destination row. At any point in this process you may click the rook icon to define a rook move.',
  move: new Move('R1e6'),
  pgn: `
[FEN "8/4R3/1k6/6K1/8/8/8/4R3 w - - 0 1"]

1. R1e6+ *
`,
};

const triple_queen_move: Position = {
  title: 'Triple Queen Move',
  hint: 'When you have 3 peices that can all go to the same square you must declare both the source column and the source row. For this you must first click on the * then click the source column. Then click the destination column. Move over to the row options. Here you can click the source selector star * then click on the source row. Finally click on the destination row. You can click on the queen peice anytime in this process.',
  move: new Move('Qg3e5'),
  pgn: `
[FEN "k7/6Q1/8/7K/8/2Q3Q1/8/8 w - - 0 1"]

1. Qg3e5 1/2-1/2
`,
};

const knight_row_move: Position = {
  title: 'Knights On The Same Column',
  hint: '',
  move: new Move('N2d4'),
  pgn: `
[FEN "8/8/4N3/1k6/7K/8/4N3/8 w - - 0 1"]

1. N2d4+ *
`,
};

const knight_column_move: Position = {
  title: 'Knights On The Same Row',
  hint: '',
  move: new Move('Nfd4'),
  pgn: `
[FEN "8/8/8/1N3N1K/8/8/1k6/8 w - - 0 1"]

1. Nfd4 *
`,
};

const finished_position: Position = {
  title: 'Finished',
  hint: 'Tutorial finished. Thanks for using chesspad ++',
  move: new Move(''),
  pgn: ``,
};

export const positions: Position[] = [
  pawn_move_scenario,
  pawn_take,
  pawn_promotion,
  rook_column_move,
  rook_row_move,
  knight_column_move,
  knight_row_move,
  triple_queen_move,
  finished_position,
];

// export class TutorialPositions {
// 	static {
// 		positions: [
// 			scenario_1,
// 			scenario_2,
// 			scenario_3,
// 			scenario_4,
// 			scenario_5,
// 			scenario_6,
// 			scenario_7,
// 			scenario_8,
// 		]
// 	}
// }
