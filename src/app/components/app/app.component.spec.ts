import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { AppComponent } from '@components/app/app.component';
import { NotepadComponent } from '../notepad/notepad.component';
import { KeyboardComponent } from '@keyboards/components/keyboard/keyboard.component';
import { KeyboardButtonComponent } from '@keyboards/components/keyboard-button/keyboard-button.component';
import { MoveDisplayComponent } from '@keyboards/components/move-display/move-display.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { routes } from '../../../routes';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        NotepadComponent,
        KeyboardComponent,
        MoveDisplayComponent,
        KeyboardButtonComponent,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
        RouterModule,
        MatSidenavModule,
        CommonModule,
        RouterModule.forRoot(routes),
      ],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('#chesspad-pp-title');
    expect(title?.textContent).toContain('Chesspad ++');
  });
});
