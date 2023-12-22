import { Injectable } from '@angular/core';
import { Chess } from 'chess.js'
// https://github.com/jhlywa/chess.js/blob/master/README.md

@Injectable({
  providedIn: 'root'
})
export class ChessInterfaceService {
  chess: Chess;
  constructor() {
    this.chess = new Chess()
  }

  test() {
    const chess = new Chess()
    // chess.move(move)
    // chess.ascii()
    // chess.clear()
    // chess.fen()
    // chess.put({ type: PAWN, color: BLACK }, 'a5')
    // chess.get('a5')
    // chess.getCastlingRights(BLACK)
    // chess.loadPgn('1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 {giuoco piano} *')
    // chess.header('White', 'Robert James Fischer')
    // chess.header('Black', 'Mikhail Tal')
    // chess.header()
    // chess.history()
    // chess.history({ verbose: true })
    // chess.isCheckmate()
    // chess.isDraw()
    // chess.isInsufficientMaterial()
    // chess.isGameOver()
    // chess.isStalemate()
    // chess.isThreefoldRepetition()
    // chess.loadPgn(sloppyPgn, { newlineChar: ':', strict: true })
    // chess.move('Nge7', { strict: true })
    // chess.moves({ verbose: true })
    // chess.undo()
    // import { validateFen } from 'chess.js'
    // validateFen('4r3/8/X12XPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45')
    debugger
  }
}
