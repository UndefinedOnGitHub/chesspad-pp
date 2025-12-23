import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { PuzzlesComponent } from './puzzles.component';
import { provideHttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { KeyboardComponent } from '../../keyboards/components/keyboard/keyboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { KeyboardButtonComponent } from '../../keyboards/components/keyboard-button/keyboard-button.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PuzzlesComponent', () => {
  let component: PuzzlesComponent;
  let fixture: ComponentFixture<PuzzlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PuzzlesComponent,
        KeyboardComponent,
        KeyboardButtonComponent,
        MatCardModule,
        MatDialogModule,
        CommonModule,
      ],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    fixture = TestBed.createComponent(PuzzlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
