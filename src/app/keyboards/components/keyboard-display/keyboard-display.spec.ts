import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardDisplay } from './keyboard-display';
import { Move } from '../../models/move';

describe('KeyboardDisplay', () => {
  let component: KeyboardDisplay;
  let fixture: ComponentFixture<KeyboardDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(KeyboardDisplay);
    component = fixture.componentInstance;
    component.move.set(new Move());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
