import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzlesComponent } from './puzzles.component';

describe('PuzzlesComponent', () => {
  let component: PuzzlesComponent;
  let fixture: ComponentFixture<PuzzlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzlesComponent],
    });
    fixture = TestBed.createComponent(PuzzlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
