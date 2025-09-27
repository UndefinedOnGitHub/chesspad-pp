import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { KeyboardComponent } from './keyboard.component';
import { KeyboardButtonComponent } from '../keyboard-button/keyboard-button.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('KeyboardComponent', () => {
  let component: KeyboardComponent;
  let fixture: ComponentFixture<KeyboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        KeyboardComponent,
        KeyboardButtonComponent,
        MatDialogModule,
        CommonModule,
      ],
    });
    fixture = TestBed.createComponent(KeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
