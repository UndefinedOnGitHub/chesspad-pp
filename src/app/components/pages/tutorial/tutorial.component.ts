import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TutorialService } from './tutorial.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { KeyboardComponent } from '@keyboards/components/keyboard/keyboard.component';
import { StepCardComponent } from './step-card/step-card.component';
import { StepProgressComponent } from './step-progress/step-progress.component';
import { positions } from './tutorial-positions';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule,
    KeyboardComponent,
    StepCardComponent,
    StepProgressComponent,
  ],
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements AfterViewInit {
  @ViewChild('chessboard') chessboard!: ElementRef;

  readonly steps = positions;
  readonly faChevronLeft = faChevronLeft;
  readonly faChevronRight = faChevronRight;
  readonly faRotateLeft = faRotateLeft;

  constructor(public tutorial: TutorialService) {}

  ngAfterViewInit() {
    this.tutorial.init(this.chessboard.nativeElement);
  }
}
