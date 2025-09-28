import { Keyboard } from './keyboard';
import { Move } from './move';

describe('Keyboard', () => {
  let move: Move;
  let keyboard: Keyboard;
  beforeEach(() => {
    move = new Move();
    keyboard = new Keyboard(move);
  });

  it('should create an instance', () => {
    expect(keyboard).toBeTruthy();
  });

  it('should set move when button is triggered', () => {
    // Check Peices
    keyboard.pieceButtons.forEach((btn) => {
      btn.onTrigger(btn);
      expect(move.piece).toEqual(btn.symbol);
    });
    // Check Letters
    keyboard.letterButtons.forEach((btn) => {
      btn.onTrigger(btn);
      expect(move.column).toEqual(btn.symbol);
    });
    // Check Numbers
    keyboard.numberButtons.forEach((btn) => {
      btn.onTrigger(btn);
      expect(move.row).toEqual(btn.symbol);
    });
  });

  describe('Additional Buttons', () => {
    // Toggle Keyboard Index
    it('Switch Button', () => {
      const btn = keyboard.switchButton;

      expect(keyboard.keyboardIdx).toEqual(0);
      btn.onTrigger();
      expect(keyboard.keyboardIdx).toEqual(1);
      btn.onTrigger();
      expect(keyboard.keyboardIdx).toEqual(0);
    });

    it('Multi Move Button', () => {
      const btn = keyboard.multiMoveButton;

      keyboard.letterButtons.forEach((lbtn, idx) => {
        btn.onTrigger(btn);
        lbtn.onTrigger(lbtn);
        const sBtn =
          keyboard.letterButtons[(idx + 1) % keyboard.letterButtons.length];
        sBtn.onTrigger(sBtn);

        expect(move.sourceColumn).toEqual(lbtn.symbol);
        expect(move.column).toEqual(sBtn.symbol);
      });

      keyboard.numberButtons.forEach((nbtn, idx) => {
        btn.onTrigger(btn);
        nbtn.onTrigger(nbtn);
        const sBtn =
          keyboard.numberButtons[(idx + 1) % keyboard.numberButtons.length];
        sBtn.onTrigger(sBtn);

        expect(move.sourceRow).toEqual(nbtn.symbol);
        expect(move.row).toEqual(sBtn.symbol);
      });
    });

    it('Long Castle Button', () => {
      const btn = keyboard.longCastleButton;
      btn.onTrigger(btn);

      expect(move.castle).toEqual('O-O-O');
    });

    it('Check Button', () => {
      const btn = keyboard.checkButton;
      btn.onTrigger(btn);

      expect(move.check).toBeTruthy();
    });

    it('Castle Button', () => {
      const btn = keyboard.castleButton;
      btn.onTrigger(btn);

      expect(move.castle).toEqual('O-O');
    });

    it('Capture Button', () => {
      const btn = keyboard.captureButton;
      btn.onTrigger(btn);

      expect(move.take).toBeTruthy();
    });
  });

  describe('Extract From Move', () => {
    it('e4', () => {
      keyboard.extractFromMove(new Move('e4'));
      const activeNumbers = keyboard.numberButtons.filter((b) => b.active);
      const activeLetters = keyboard.letterButtons.filter((b) => b.active);

      expect(activeNumbers.length).toEqual(1);
      expect(activeLetters.length).toEqual(1);

      expect(activeNumbers[0].symbol).toEqual('4');
      expect(activeLetters[0].symbol).toEqual('e');
    });

    it('Qf8', () => {
      keyboard.extractFromMove(new Move('Qf8'));
      const activeNumbers = keyboard.numberButtons.filter((b) => b.active);
      const activeLetters = keyboard.letterButtons.filter((b) => b.active);
      const activePieces = keyboard.pieceButtons.filter((b) => b.active);

      expect(activeNumbers.length).toEqual(1);
      expect(activeLetters.length).toEqual(1);
      expect(activePieces.length).toEqual(1);

      expect(activeNumbers[0].symbol).toEqual('8');
      expect(activeLetters[0].symbol).toEqual('f');
      expect(activePieces[0].symbol).toEqual('Q');
    });

    it('Rxh5', () => {
      keyboard.extractFromMove(new Move('Rxh5'));
      const activeNumbers = keyboard.numberButtons.filter((b) => b.active);
      const activeLetters = keyboard.letterButtons.filter((b) => b.active);
      const activePieces = keyboard.pieceButtons.filter((b) => b.active);

      expect(activeNumbers.length).toEqual(1);
      expect(activeLetters.length).toEqual(1);
      expect(activePieces.length).toEqual(1);

      expect(activeNumbers[0].symbol).toEqual('5');
      expect(activeLetters[0].symbol).toEqual('h');
      expect(activePieces[0].symbol).toEqual('R');
      expect(keyboard.captureButton.active).toBeTruthy();
    });

    it('Rad8', () => {
      keyboard.extractFromMove(new Move('Rad8'));
      const activeNumbers = keyboard.numberButtons.filter((b) => b.active);
      const activeLetters = keyboard.letterButtons.filter((b) => b.active);
      const activePieces = keyboard.pieceButtons.filter((b) => b.active);

      expect(activeNumbers.length).toEqual(1);
      expect(activeLetters.length).toEqual(2);
      expect(activePieces.length).toEqual(1);

      expect(activeNumbers[0].symbol).toEqual('8');
      expect(activeLetters[0].symbol).toEqual('a');
      expect(activeLetters[0].isSecondaryActive()).toBeTruthy();
      expect(activeLetters[1].symbol).toEqual('d');
      expect(activePieces[0].symbol).toEqual('R');
    });

    it('Qb3f7', () => {
      keyboard.extractFromMove(new Move('Qb3f7'));
      const activeNumbers = keyboard.numberButtons.filter((b) => b.active);
      const activeLetters = keyboard.letterButtons.filter((b) => b.active);
      const activePieces = keyboard.pieceButtons.filter((b) => b.active);

      expect(activeNumbers.length).toEqual(2);
      expect(activeLetters.length).toEqual(2);
      expect(activePieces.length).toEqual(1);

      expect(activeNumbers[0].symbol).toEqual('3');
      expect(activeNumbers[0].isSecondaryActive()).toBeTruthy();
      expect(activeNumbers[1].symbol).toEqual('7');

      expect(activeLetters[0].symbol).toEqual('b');
      expect(activeLetters[0].isSecondaryActive()).toBeTruthy();
      expect(activeLetters[1].symbol).toEqual('f');
      expect(activePieces[0].symbol).toEqual('Q');
    });
  });
});
