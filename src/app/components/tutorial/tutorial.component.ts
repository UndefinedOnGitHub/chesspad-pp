import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TutorialService } from '@services/tutorial.service';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { KeyboardComponent } from '../../keyboards/components/keyboard/keyboard.component';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [MatCardModule, MatDialogModule, KeyboardComponent],
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements AfterViewInit {
  @ViewChild('chessboard') chessboard!: ElementRef;

  constructor(public tutorial: TutorialService) {}
  ngAfterViewInit() {
    this.tutorial.init(this.chessboard.nativeElement);
  }
}
