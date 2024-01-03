import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardComponent } from './keyboard.component';
import { KeyboardButtonComponent } from '../keyboard-button/keyboard-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';

describe('KeyboardComponent', () => {
  let component: KeyboardComponent;
  let fixture: ComponentFixture<KeyboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyboardComponent, KeyboardButtonComponent],
      imports: [FontAwesomeModule, MatDialogModule],
    });
    fixture = TestBed.createComponent(KeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
