import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface KeyboardButtonParams {
  key: string;
  symbol?: string;
  type?: string;
  class?: string;
  icon?: IconDefinition;
  onTrigger?: Function;
}

export class KeyboardButton {
  key: string;
  symbol: string;
  type: string;
  icon: IconDefinition | undefined;
  onTrigger: Function;
  private secondaryActive: Boolean = false;
  active: boolean = false;

  constructor(params: KeyboardButtonParams) {
    this.key = params.key;
    this.symbol = params.symbol || '';
    this.icon = params.icon;
    this.type = params.type || 'base';
    this.secondaryActive = params.class == 'secondary-active';
    this.onTrigger = params.onTrigger || this.toggleActive;
  }

  trigger(self: KeyboardButton): void {
    this.onTrigger(self);
  }

  toggleActive(manualValue: boolean | undefined = undefined): void {
    this.active = manualValue == undefined ? !this.active : manualValue;
  }

  toggleSecondaryActive(manualValue: boolean | undefined = undefined) {
    this.secondaryActive = true;
    this.toggleActive(manualValue);
  }

  isActive(): boolean {
    return !this.secondaryActive && this.active;
  }

  isSecondaryActive(): boolean {
    return this.secondaryActive && this.active;
  }

  deactivate() {
    this.active = false;
    this.secondaryActive = false;
  }

  get value(): string {
    return this.symbol;
  }

  get class(): string {
    return this.secondaryActive ? 'secondary-active' : '';
  }
}

export class MultiButton {
  buttons: KeyboardButton[] = [];
  constructor(btns: KeyboardButton[] = []) {
    this.buttons = btns;
  }

  index(idx: number) {
    return this.buttons[idx];
  }
}
