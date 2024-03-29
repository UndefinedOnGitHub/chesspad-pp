import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NotepadComponent } from './notepad/notepad.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyboardButtonComponent } from './keyboard-button/keyboard-button.component';
import { GameComponent } from './game/game.component';
import { MoveDisplayComponent } from './move-display/move-display.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NotepadComponent,
        KeyboardComponent,
        MoveDisplayComponent,
        KeyboardButtonComponent,
        GameComponent,
      ],
      imports: [
        MatToolbarModule,
        FontAwesomeModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
        RouterModule,
        RouterTestingModule,
        MatSidenavModule,
        BrowserAnimationsModule,
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
