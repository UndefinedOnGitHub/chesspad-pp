import { Component } from '@angular/core';
import { TutorialService } from '../tutorial.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent {
  constructor(public tutorial: TutorialService) {}
  ngOnInit() {
    this.tutorial.init(document.getElementById('tutorial-chessboard'));
  }
}
