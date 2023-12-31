import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzlesComponent } from './puzzles.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { KeyboardComponent } from '../keyboard/keyboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { KeyboardButtonComponent } from '../keyboard-button/keyboard-button.component';

describe('PuzzlesComponent', () => {
  let component: PuzzlesComponent;
  let fixture: ComponentFixture<PuzzlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PuzzlesComponent,
        KeyboardComponent,
        KeyboardButtonComponent,
      ],
      imports: [
        HttpClientModule,
        MatCardModule,
        MatDialogModule,
        FontAwesomeModule,
      ],
    });
    fixture = TestBed.createComponent(PuzzlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
