import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private snackBar: MatSnackBar) {}

  warn(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000 });
  }
}
