import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameReviewComponent } from './game-review.component';

describe('GameReviewComponent', () => {
  let component: GameReviewComponent;
  let fixture: ComponentFixture<GameReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameReviewComponent],
    });
    fixture = TestBed.createComponent(GameReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
