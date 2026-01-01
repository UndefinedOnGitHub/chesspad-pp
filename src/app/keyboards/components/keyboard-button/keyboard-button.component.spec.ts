import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { KeyboardButton } from '../../models/button';

import { KeyboardButtonComponent } from './keyboard-button.component';

describe('KeyboardButtonComponent', () => {
  let component: KeyboardButtonComponent;
  let fixture: ComponentFixture<KeyboardButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KeyboardButtonComponent, CommonModule],
    });
    fixture = TestBed.createComponent(KeyboardButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'button',
      new KeyboardButton({ key: 'button' }),
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
