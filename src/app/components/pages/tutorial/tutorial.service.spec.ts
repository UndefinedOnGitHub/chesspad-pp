import { TestBed } from '@angular/core/testing';

import { TutorialService } from './tutorial.service';
import { positions } from './tutorial-positions';
import { Move } from '@keyboards/models/move';

describe('TutorialService', () => {
  let service: TutorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorialService);
    service.restart();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('starts on the first step', () => {
    expect(service.positionIdx).toEqual(0);
    expect(service.stepNumber).toEqual(1);
    expect(service.totalSteps).toEqual(positions.length);
    expect(service.isFirstStep).toBeTrue();
  });

  describe('navigation', () => {
    it('moves forward and back', () => {
      service.next();
      expect(service.currentPosition).toBe(positions[1]);
      service.back();
      expect(service.currentPosition).toBe(positions[0]);
    });

    it('clamps at the first step', () => {
      service.back();
      expect(service.positionIdx).toEqual(0);
    });

    it('clamps at the last step', () => {
      service.goTo(positions.length + 5);
      expect(service.positionIdx).toEqual(positions.length - 1);
      expect(service.isLastStep).toBeTrue();
      service.next();
      expect(service.positionIdx).toEqual(positions.length - 1);
    });

    it('jumps to an arbitrary step', () => {
      service.goTo(3);
      expect(service.currentPosition).toBe(positions[3]);
    });

    it('clears the keyboard when the step changes', () => {
      service.goTo(2);
      expect(String(service.moveSubject.value)).toEqual('');
    });
  });

  describe('validateMove', () => {
    it('advances when the move matches', () => {
      service.goTo(1);
      service.validateMove(new Move('e4'));
      expect(service.positionIdx).toEqual(2);
    });

    it('throws when the move does not match', () => {
      service.goTo(1);
      expect(() => service.validateMove(new Move('d4'))).toThrow();
      expect(service.positionIdx).toEqual(1);
    });
  });
});
