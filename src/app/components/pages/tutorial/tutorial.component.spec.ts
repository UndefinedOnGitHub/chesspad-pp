import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { TutorialComponent } from './tutorial.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { KeyboardComponent } from '@keyboards/components/keyboard/keyboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { KeyboardButtonComponent } from '@keyboards/components/keyboard-button/keyboard-button.component';
import { KeycapComponent } from './keycap/keycap.component';

describe('TutorialComponent', () => {
  let component: TutorialComponent;
  let fixture: ComponentFixture<TutorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TutorialComponent,
        KeyboardComponent,
        KeyboardButtonComponent,
        KeycapComponent,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        FontAwesomeModule,
        CommonModule,
      ],
    });
    fixture = TestBed.createComponent(TutorialComponent);
    component = fixture.componentInstance;
    component.tutorial.restart();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a dot for every step', () => {
    const dots = fixture.nativeElement.querySelectorAll('.step-dot');
    expect(dots.length).toEqual(component.steps.length);
  });

  it('renders the current step title', () => {
    const title = fixture.nativeElement.querySelector('.step-title');
    expect(title.textContent).toContain(
      component.tutorial.currentPosition.title,
    );
  });
});
