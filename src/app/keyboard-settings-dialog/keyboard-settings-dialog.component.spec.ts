import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardSettingsDialogComponent } from './keyboard-settings-dialog.component';

describe('KeyboardSettingsDialogComponent', () => {
  let component: KeyboardSettingsDialogComponent;
  let fixture: ComponentFixture<KeyboardSettingsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyboardSettingsDialogComponent],
    });
    fixture = TestBed.createComponent(KeyboardSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
