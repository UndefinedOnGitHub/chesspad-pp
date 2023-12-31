import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameReviewComponent } from './game-review.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { KeyboardComponent } from '../keyboard/keyboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { KeyboardButtonComponent } from '../keyboard-button/keyboard-button.component';

describe('GameReviewComponent', () => {
  let component: GameReviewComponent;
  let fixture: ComponentFixture<GameReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameReviewComponent,
        KeyboardComponent,
        KeyboardButtonComponent,
      ],
      imports: [
        HttpClientModule,
        MatSelectModule,
        MatCardModule,
        MatDialogModule,
        FontAwesomeModule,
      ],
    });
    fixture = TestBed.createComponent(GameReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
