import { faChessKing } from '@fortawesome/free-solid-svg-icons';
import { KeyboardButton, MultiButton } from './button';

describe('KeyboardButton', () => {
  it('should create an instance', () => {
    expect(new KeyboardButton({ key: 'button' })).toBeTruthy();
  });

  it('should assign attributes', () => {
    const keyboardParams = {
      key: 'button',
      symbol: 'K',
      type: 'piece',
      icon: faChessKing,
      onTrigger: (btn: any) => '',
    };
    spyOn(keyboardParams, 'onTrigger');

    const kb = new KeyboardButton(keyboardParams);
    kb.trigger(kb);

    expect(keyboardParams.onTrigger).toHaveBeenCalled();
    expect(kb.key).toEqual(keyboardParams.key);
    expect(kb.symbol).toEqual(keyboardParams.symbol);
    expect(kb.icon).toEqual(keyboardParams.icon);
    expect(kb.type).toEqual(keyboardParams.type);
  });

  it('should toggle active', () => {
    const btn = new KeyboardButton({ key: 'button' });

    expect(btn.active).toBeFalsy();
    btn.toggleActive();
    expect(btn.active).toBeTruthy();
    btn.toggleActive();
    expect(btn.active).toBeFalsy();
  });

  it('should toggle active', () => {
    const btn = new KeyboardButton({ key: 'button' });

    expect(btn.isActive()).toBeFalsy();
    expect(btn.isSecondaryActive()).toBeFalsy();

    btn.toggleActive();
    expect(btn.isActive()).toBeTruthy();
    expect(btn.isSecondaryActive()).toBeFalsy();

    btn.toggleActive();
    expect(btn.isActive()).toBeFalsy();
    expect(btn.isSecondaryActive()).toBeFalsy();
  });

  it('should toggle secondary active', () => {
    const btn = new KeyboardButton({ key: 'button' });
    expect(btn.isActive()).toBeFalsy();
    expect(btn.isSecondaryActive()).toBeFalsy();

    btn.toggleSecondaryActive();
    expect(btn.isActive()).toBeFalsy();
    expect(btn.isSecondaryActive()).toBeTruthy();

    btn.toggleSecondaryActive();
    expect(btn.isActive()).toBeFalsy();
    expect(btn.isSecondaryActive()).toBeFalsy();
  });
});

describe('MultiButton', () => {
  it('should create an instance', () => {
    expect(
      new MultiButton([new KeyboardButton({ key: 'button' })]),
    ).toBeTruthy();
  });
});
