import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyboardButtonComponent } from './keyboard-button/keyboard-button.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    KeyboardButtonComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
