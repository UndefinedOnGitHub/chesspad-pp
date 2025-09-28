import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { MoveDisplayComponent } from './move-display.component';

describe('MoveDisplayComponent', () => {
  let component: MoveDisplayComponent;
  let fixture: ComponentFixture<MoveDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MoveDisplayComponent, CommonModule],
    });
    fixture = TestBed.createComponent(MoveDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
