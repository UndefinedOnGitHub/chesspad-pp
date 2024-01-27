import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameReviewSelectorDialogComponent } from './game-review-selector-dialog.component';

describe('GameReviewSelectorDialogComponent', () => {
  let component: GameReviewSelectorDialogComponent;
  let fixture: ComponentFixture<GameReviewSelectorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameReviewSelectorDialogComponent],
    });
    fixture = TestBed.createComponent(GameReviewSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
