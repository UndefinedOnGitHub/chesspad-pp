import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialComponent } from './tutorial.component';
import { MatCardModule } from '@angular/material/card';
import { KeyboardComponent } from '../keyboard/keyboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { KeyboardButtonComponent } from '../keyboard-button/keyboard-button.component';

describe('TutorialComponent', () => {
  let component: TutorialComponent;
  let fixture: ComponentFixture<TutorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TutorialComponent,
        KeyboardComponent,
        KeyboardButtonComponent,
      ],
      imports: [MatCardModule, MatDialogModule, FontAwesomeModule],
    });
    fixture = TestBed.createComponent(TutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
