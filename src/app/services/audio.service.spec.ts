import { TestBed } from '@angular/core/testing';

import { AudioService } from './audio.service';

describe('AudioService', () => {
  let service: AudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start and stop background music', () => {
    expect(service.isBackgroundMusicPlaying()).toBeFalse();
    
    service.startBackgroundMusic();
    expect(service.isBackgroundMusicPlaying()).toBeFalse(); // Will be false until audio loads
    
    service.stopBackgroundMusic();
    expect(service.isBackgroundMusicPlaying()).toBeFalse();
  });

  it('should set and get volume correctly', () => {
    service.setVolume(0.5);
    expect(service.getVolume()).toBe(0.5);
    
    // Test clamping
    service.setVolume(1.5);
    expect(service.getVolume()).toBe(1);
    
    service.setVolume(-0.5);
    expect(service.getVolume()).toBe(0);
  });
});
