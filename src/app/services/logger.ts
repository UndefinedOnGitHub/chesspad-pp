import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logger {
  log(logObject: any) {
    if (location.origin.includes("localhost")) console.log(logObject);
  }
}
