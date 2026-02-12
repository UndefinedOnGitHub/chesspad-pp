import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logger {
  get log() {
    if (isDevMode()) {
      return console.log.bind(console)
    } else {
      return () => {}
    };
  }
  get error() {
    if (isDevMode()) {
      return console.error.bind(console)
    } else {
      return () => {}
    };
  }
}
