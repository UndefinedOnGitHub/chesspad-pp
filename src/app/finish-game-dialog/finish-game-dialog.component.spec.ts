import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishGameDialogComponent } from './finish-game-dialog.component';

describe('FinishGameDialogComponent', () => {
  let component: FinishGameDialogComponent;
  let fixture: ComponentFixture<FinishGameDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinishGameDialogComponent],
    });
    fixture = TestBed.createComponent(FinishGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
