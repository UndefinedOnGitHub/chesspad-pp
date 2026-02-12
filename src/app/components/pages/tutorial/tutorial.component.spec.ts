import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { TutorialComponent } from './tutorial.component';
import { MatCardModule } from '@angular/material/card';
import { KeyboardComponent } from '@keyboards/components/keyboard/keyboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { KeyboardButtonComponent } from '@keyboards/components/keyboard-button/keyboard-button.component';

describe('TutorialComponent', () => {
  let component: TutorialComponent;
  let fixture: ComponentFixture<TutorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TutorialComponent,
        KeyboardComponent,
        KeyboardButtonComponent,
        MatCardModule,
        MatDialogModule,
        CommonModule,
      ],
    });
    fixture = TestBed.createComponent(TutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
