import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { NotepadComponent } from '../notepad/notepad.component';
import { KeyboardComponent } from '../keyboard/keyboard.component';
import { KeyboardButtonComponent } from '../keyboard-button/keyboard-button.component';
import { MoveDisplayComponent } from '../move-display/move-display.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        NotepadComponent,
        KeyboardComponent,
        MoveDisplayComponent,
        KeyboardButtonComponent,
      ],
      imports: [MatCardModule, FontAwesomeModule],
    });
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
