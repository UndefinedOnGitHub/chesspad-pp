import { Keyboard } from './keyboard';
import { Move } from './move';

describe('Keyboard', () => {
  it('should create an instance', () => {
    expect(new Keyboard(new Move(), () => {})).toBeTruthy();
  });
});
