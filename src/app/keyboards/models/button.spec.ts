import { KeyboardButton } from './button';

describe('KeyboardButton', () => {
  it('should create an instance', () => {
    expect(new KeyboardButton({ key: 'button' })).toBeTruthy();
  });
});
