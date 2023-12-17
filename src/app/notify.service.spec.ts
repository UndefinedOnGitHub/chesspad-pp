import { TestBed } from '@angular/core/testing';

import { NotifyService } from './notify.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('NotifyService', () => {
  let service: NotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
    });
    service = TestBed.inject(NotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
