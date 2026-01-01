import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { GameReviewSelectorDialogComponent } from './game-review-selector-dialog.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

describe('GameReviewSelectorDialogComponent', () => {
  let component: GameReviewSelectorDialogComponent;
  let fixture: ComponentFixture<GameReviewSelectorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        GameReviewSelectorDialogComponent,
        MatSelectModule,
        MatDialogModule,
        CommonModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(GameReviewSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
