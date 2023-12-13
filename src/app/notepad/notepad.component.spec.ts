import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotepadComponent } from './notepad.component';
import { MoveDisplayComponent } from '../move-display/move-display.component';

describe('NotepadComponent', () => {
  let component: NotepadComponent;
  let fixture: ComponentFixture<NotepadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotepadComponent, MoveDisplayComponent],
    });
    fixture = TestBed.createComponent(NotepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
