import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { NotepadComponent } from './notepad.component';
import { MoveDisplayComponent } from '../keyboards/components/move-display/move-display.component';
import { GameService } from '../game.service';

describe('NotepadComponent', () => {
  let component: NotepadComponent;
  let fixture: ComponentFixture<NotepadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotepadComponent, MoveDisplayComponent, CommonModule],
    });
    fixture = TestBed.createComponent(NotepadComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('game', TestBed.inject(GameService));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
