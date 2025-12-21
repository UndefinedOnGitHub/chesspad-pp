import { Component } from '@angular/core';
import { TutorialService } from '../tutorial.service';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { KeyboardComponent } from '../keyboards/components/keyboard/keyboard.component';


@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [MatCardModule, MatDialogModule, KeyboardComponent],
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent {
  constructor(public tutorial: TutorialService) {}
  ngOnInit() {
    this.tutorial.init(document.getElementById('tutorial-chessboard'));
  }
}
