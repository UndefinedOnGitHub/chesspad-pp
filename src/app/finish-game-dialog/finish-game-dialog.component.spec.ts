import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishGameDialogComponent } from './finish-game-dialog.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FinishGameDialogComponent', () => {
  let component: FinishGameDialogComponent;
  let fixture: ComponentFixture<FinishGameDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinishGameDialogComponent],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(FinishGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
