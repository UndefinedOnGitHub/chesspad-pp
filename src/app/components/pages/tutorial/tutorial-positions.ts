import { Move } from '@keyboards/models/move';
import { Piece, Queen, Rook, Knight } from '../../../constants';
import {
  faChess,
  faEquals,
  faHashtag,
  faRotateRight,
  faStarOfLife,
  faXmark,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

/**
 * A single key drawn in a tutorial sequence.
 *
 * `kind` mirrors the real keyboard's colouring: 'key' is a coordinate slab,
 * 'fn' is one of the always-present action keys, 'piece' carries a chess icon
 * and 'submit' is the tall return pill.
 */
export type CapKind = 'key' | 'fn' | 'piece' | 'submit';

export interface Cap {
  label?: string;
  icon?: IconDefinition;
  kind: CapKind;
  // Drawn in the secondary colour, matching a `secondary-active` key
  source?: boolean;
  // Caption shown above the cap where the pad flipped without being asked
  auto?: string;
  aria: string;
}

export interface Position {
  title: string;
  move: Move;
  pgn: string;
  // One or two plain sentences: the situation, and the notation rule it needs
  summary: string;
  sequence: Cap[];
  // Why the sequence looks the way it does
  note?: string;
  // A second valid route to the same move
  alternate?: { label: string; sequence: Cap[] };
  // Key reference, only used by the intro step
  legend?: { cap: Cap; text: string }[];
}

//
// Cap builders
//

const file = (symbol: string, extra: Partial<Cap> = {}): Cap => ({
  label: symbol,
  kind: 'key',
  aria: `file ${symbol}`,
  ...extra,
});

const rank = (symbol: string, extra: Partial<Cap> = {}): Cap => ({
  label: symbol,
  kind: 'key',
  aria: `rank ${symbol}`,
  ...extra,
});

const piece = (p: Piece): Cap => ({
  icon: p.icon,
  kind: 'piece',
  aria: `${p.key} key`,
});

const CAPTURE: Cap = { icon: faXmark, kind: 'fn', aria: 'capture key' };
const SOURCE: Cap = {
  icon: faStarOfLife,
  kind: 'fn',
  source: true,
  aria: 'source selector key',
};
const PROMOTE: Cap = { icon: faEquals, kind: 'fn', aria: 'promotion key' };
const SWITCH: Cap = { icon: faHashtag, kind: 'fn', aria: 'switch pad key' };
const CASTLE: Cap = { icon: faChess, kind: 'fn', aria: 'castle key' };
const CLEAR: Cap = { icon: faRotateRight, kind: 'fn', aria: 'clear key' };
const SUBMIT: Cap = { label: '‖', kind: 'submit', aria: 'submit key' };

// Captions for the two places the pad flips on its own
const RANKS_APPEAR = 'ranks appear';
const FILES_RETURN = 'files return';

//
// Steps
//

const intro: Position = {
  title: 'How the Pad Works',
  summary:
    'The pad never changes shape. Piece keys sit down the left and right edges, the action keys run along the bottom, and only the six keys in the middle swap between files (a-h) and ranks (1-8). Build a move by tapping its parts in any order, then submit.',
  note: 'You will almost never press #. Tapping a file switches the middle keys to ranks by itself, and tapping x switches them back to files. The # key is there for the times you want to flip them by hand — for example if you typed the destination first and then went back for a source square.',
  sequence: [],
  legend: [
    {
      cap: SOURCE,
      text: 'Marks your next tap as the square the piece came from.',
    },
    { cap: CAPTURE, text: 'Capture. The x in exd5 or Nxe5.' },
    {
      cap: PROMOTE,
      text: 'Promotion. Tap it, then tap the piece you promote to.',
    },
    {
      cap: SWITCH,
      text: 'Flips the middle keys between files and ranks. Optional.',
    },
    { cap: CASTLE, text: 'Castle. Once for O-O, again for O-O-O.' },
    { cap: CLEAR, text: 'Clears the move you are building.' },
    { cap: SUBMIT, text: 'Submits the move.' },
  ],
  move: new Move(''),
  pgn: ``,
};

const pawn_move: Position = {
  title: 'A Pawn Move',
  summary:
    'The most common opening move in chess. Pawn moves carry no piece letter, so the notation is just the destination square: e4.',
  sequence: [file('e'), rank('4', { auto: RANKS_APPEAR }), SUBMIT],
  note: 'Tapping the file e switched the middle keys to ranks for you, so 4 was already waiting. No # required. Pressing the pawn key first is allowed but adds nothing — a pawn is the absence of a piece letter.',
  move: new Move('e4'),
  pgn: `1. e4 *`,
};

const pawn_take: Position = {
  title: 'A Pawn Captures',
  summary:
    'The e4 pawn takes on d5. A capturing pawn has no letter of its own, so notation names the file it left from instead: exd5.',
  sequence: [
    file('e', { source: true }),
    CAPTURE,
    file('d', { auto: FILES_RETURN }),
    rank('5', { auto: RANKS_APPEAR }),
    SUBMIT,
  ],
  note: 'Tapping x straight after a file flips the keys back to files, so your next tap lands on the destination. The pad then rewrites the first file as the source: e, x, d becomes exd.',
  alternate: {
    label: 'Or name the source square up front',
    sequence: [
      SOURCE,
      file('e', { source: true }),
      CAPTURE,
      file('d', { auto: RANKS_APPEAR }),
      rank('5'),
      SUBMIT,
    ],
  },
  move: new Move('exd5'),
  pgn: `
[FEN "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1"]

1. exd5 *
`,
};

const pawn_promotion: Position = {
  title: 'Promotion',
  summary:
    'A pawn reaching the last rank becomes another piece. Write the square it lands on, then = and the piece it turns into: d8=Q.',
  sequence: [
    file('d'),
    rank('8', { auto: RANKS_APPEAR }),
    PROMOTE,
    piece(Queen),
    SUBMIT,
  ],
  note: 'The piece keys never move — Q is on the pad whether the middle keys are showing files or ranks, so you can reach it straight after the rank. Tap = first, otherwise Q would be read as the piece that is moving.',
  move: new Move('d8=Q'),
  pgn: `
[FEN "k7/3P4/7K/8/8/8/1Q6/8 w - - 0 1"]

1. d8=Q+ *
`,
};

const knight_takes: Position = {
  title: 'A Piece Captures',
  summary:
    'The knight on f3 takes the pawn on e5. Unlike a pawn, a piece keeps its own letter when it captures: Nxe5.',
  sequence: [
    piece(Knight),
    CAPTURE,
    file('e', { auto: RANKS_APPEAR }),
    rank('5'),
    SUBMIT,
  ],
  note: 'Here x comes before any file, so nothing flips — you are still on files and e is right there. Tapping e is what switches you to ranks.',
  move: new Move('Nxe5'),
  pgn: `
[FEN "rnbqkbnr/pppp1ppp/8/4p3/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 0 1"]

1. Nxe5 *
`,
};

const rook_same_rank: Position = {
  title: 'Two Rooks, Same Rank',
  summary:
    'Rooks on d4 and f4 can both reach e4, so "Re4" would be ambiguous. They sit on different files, so the file of the one that moves is added: Rde4.',
  sequence: [
    piece(Rook),
    SOURCE,
    file('d', { source: true }),
    file('e', { auto: RANKS_APPEAR }),
    rank('4'),
    SUBMIT,
  ],
  note: 'Press the star before the source file, not after. Picking a source deliberately leaves the keys on files, because a destination file still has to follow — the switch happens on that second tap.',
  move: new Move('Rde4'),
  pgn: `
[FEN "1r2k3/8/8/8/3R1R2/8/2K5/7r w - - 0 1"]

1. Rde4+ *
`,
};

const rook_same_file: Position = {
  title: 'Two Rooks, Same File',
  summary:
    'Rooks on e1 and e7 both reach e6. They share a file, so this time the rank of the one that moves is what separates them: R1e6.',
  sequence: [
    piece(Rook),
    file('e', { auto: RANKS_APPEAR }),
    SOURCE,
    rank('1', { source: true }),
    rank('6'),
    SUBMIT,
  ],
  note: 'The star is the same key on both pads. Pressed while ranks are showing it arms a source rank instead of a source file, which is exactly what this move needs.',
  move: new Move('R1e6'),
  pgn: `
[FEN "8/4R3/1k6/6K1/8/8/8/4R3 w - - 0 1"]

1. R1e6+ *
`,
};

const knight_same_rank: Position = {
  title: 'Two Knights, Same Rank',
  summary:
    'Knights on b5 and f5 both reach d4. Same rank, different files, so the file disambiguates: Nfd4.',
  sequence: [
    piece(Knight),
    SOURCE,
    file('f', { source: true }),
    file('d', { auto: RANKS_APPEAR }),
    rank('4'),
    SUBMIT,
  ],
  note: 'Same shape as the two rooks on a rank. The piece key can be tapped at any point in the sequence — first is simply the easiest to remember.',
  move: new Move('Nfd4'),
  pgn: `
[FEN "8/8/8/1N3N1K/8/8/1k6/8 w - - 0 1"]

1. Nfd4 *
`,
};

const knight_same_file: Position = {
  title: 'Two Knights, Same File',
  summary:
    'Knights on e2 and e6 both reach d4. They share the e file, so the rank disambiguates: N2d4.',
  sequence: [
    piece(Knight),
    file('d', { auto: RANKS_APPEAR }),
    SOURCE,
    rank('2', { source: true }),
    rank('4'),
    SUBMIT,
  ],
  note: 'Note the order: the destination file d comes first and brings up the ranks, then the star arms the source rank. Doing it the other way round would need a # to get back.',
  move: new Move('N2d4'),
  pgn: `
[FEN "8/8/4N3/1k6/7K/8/4N3/8 w - - 0 1"]

1. N2d4+ *
`,
};

const triple_queen: Position = {
  title: 'Three Queens',
  summary:
    'Queens on c3, g3 and g7 all reach e5. The g3 queen shares a file with g7 and a rank with c3, so neither alone is enough — it needs both: Qg3e5.',
  sequence: [
    piece(Queen),
    SOURCE,
    file('g', { source: true }),
    file('e', { auto: RANKS_APPEAR }),
    SOURCE,
    rank('3', { source: true }),
    rank('5'),
    SUBMIT,
  ],
  note: 'The star only ever applies to the next tap, so a move needing both a source file and a source rank presses it twice — once on each pad. Still no #.',
  move: new Move('Qg3e5'),
  pgn: `
[FEN "k7/6Q1/8/7K/8/2Q3Q1/8/8 w - - 0 1"]

1. Qg3e5 1/2-1/2
`,
};

const finished: Position = {
  title: 'Finished',
  summary:
    'That is the whole keyboard. Every move is a piece, an optional source square, an optional x, a destination square, and submit — with the middle keys flipping themselves as you go.',
  note: 'Thanks for using chesspad ++.',
  sequence: [],
  move: new Move(''),
  pgn: ``,
};

export const positions: Position[] = [
  intro,
  pawn_move,
  pawn_take,
  pawn_promotion,
  knight_takes,
  rook_same_rank,
  rook_same_file,
  knight_same_rank,
  knight_same_file,
  triple_queen,
  finished,
];
