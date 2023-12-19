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
  class: string;
  icon: IconDefinition | undefined;
  onTrigger: Function;

  active: boolean = false;
  constructor(params: KeyboardButtonParams) {
    this.key = params.key;
    this.symbol = params.symbol || '';
    this.icon = params.icon;
    this.type = params.type || 'base';
    this.class = params.class || '';
    this.onTrigger = params.onTrigger || this.toggleActive;
  }

  trigger(self: KeyboardButton): void {
    this.onTrigger(self);
  }

  toggleActive(manualValue: boolean | undefined = undefined): void {
    this.active = manualValue == undefined ? !this.active : manualValue;
  }

  toggleSecondaryActive(manualValue: boolean | undefined = undefined) {
    this.class = 'secondary-active';
    this.toggleActive(manualValue);
  }

  isActive(): boolean {
    return this.class != 'secondary-active' && this.active;
  }

  isSecondaryActive(): boolean {
    return this.class == 'secondary-active' && this.active;
  }

  deactivate() {
    this.active = false;
    this.class = '';
  }

  get value(): string {
    return this.symbol;
  }
}
