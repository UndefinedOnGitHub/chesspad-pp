import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardSettingsDialogComponent } from './keyboard-settings-dialog.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

describe('KeyboardSettingsDialogComponent', () => {
  let component: KeyboardSettingsDialogComponent;
  let fixture: ComponentFixture<KeyboardSettingsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyboardSettingsDialogComponent],
      imports: [MatDialogModule, MatSlideToggleModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(KeyboardSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
