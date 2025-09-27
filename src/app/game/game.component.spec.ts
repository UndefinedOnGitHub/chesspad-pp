import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NotepadComponent } from '../notepad/notepad.component';
import { KeyboardComponent } from '../keyboards/components/keyboard/keyboard.component';
import { KeyboardButtonComponent } from '../keyboards/components/keyboard-button/keyboard-button.component';
import { MoveDisplayComponent } from '../keyboards/components/move-display/move-display.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        GameComponent,
        NotepadComponent,
        KeyboardComponent,
        MoveDisplayComponent,
        KeyboardButtonComponent,
        MatCardModule,
        MatSnackBarModule,
        MatDialogModule,
        CommonModule,
      ],
    });
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
