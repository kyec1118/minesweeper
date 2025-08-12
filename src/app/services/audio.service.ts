import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private backgroundMusic: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.3; // Default volume (30%)

  constructor() {
    this.initializeAudio();
  }

  private initializeAudio() {
    // Initialize background music
    this.backgroundMusic = new Audio();
    
    // Try multiple possible paths
    const possiblePaths = [
      '/assets/audio/puzzle-game-loop.mp3',
      'assets/audio/puzzle-game-loop.mp3',
      './assets/audio/puzzle-game-loop.mp3'
    ];
    
    this.backgroundMusic.src = possiblePaths[0];
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = this.volume;
    this.backgroundMusic.preload = 'auto';
    
    // Handle loading errors - try next path
    this.backgroundMusic.addEventListener('error', (e) => {
      console.error('Background music failed to load:', this.backgroundMusic?.src);
      const currentIndex = possiblePaths.indexOf(this.backgroundMusic?.src || '');
      if (currentIndex < possiblePaths.length - 1 && this.backgroundMusic) {
        console.log('Trying next path:', possiblePaths[currentIndex + 1]);
        this.backgroundMusic.src = possiblePaths[currentIndex + 1];
      } else {
        console.error('All audio paths failed. Please check if puzzle-game-loop.mp3 exists in src/assets/audio/');
      }
    });

    // Handle successful loading
    this.backgroundMusic.addEventListener('loadeddata', () => {
      console.log('Background music loaded successfully from:', this.backgroundMusic?.src);
    });

    // Auto-play when loaded (if user has interacted with page)
    this.backgroundMusic.addEventListener('canplaythrough', () => {
      console.log('Background music ready to play');
      if (this.isPlaying) {
        this.playBackgroundMusic();
      }
    });
  }

  startBackgroundMusic() {
    this.isPlaying = true;
    this.playBackgroundMusic();
  }

  stopBackgroundMusic() {
    this.isPlaying = false;
    if (this.backgroundMusic && !this.backgroundMusic.paused) {
      this.backgroundMusic.pause();
    }
  }

  toggleBackgroundMusic() {
    if (this.isPlaying) {
      this.stopBackgroundMusic();
    } else {
      this.startBackgroundMusic();
    }
  }

  private playBackgroundMusic() {
    if (this.backgroundMusic) {
      console.log('Attempting to play background music');
      this.backgroundMusic.play().catch(error => {
        // Handle autoplay restrictions
        console.warn('Autoplay prevented. User interaction required:', error);
        if (error.name === 'NotSupportedError') {
          console.error('Audio file format not supported or file not found');
        }
      });
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume)); // Clamp between 0 and 1
    if (this.backgroundMusic) {
      this.backgroundMusic.volume = this.volume;
    }
  }

  getVolume(): number {
    return this.volume;
  }

  isBackgroundMusicPlaying(): boolean {
    return this.isPlaying && !!this.backgroundMusic && !this.backgroundMusic.paused;
  }

  // Method to ensure music starts after user interaction (for autoplay restrictions)
  enableAudioAfterUserInteraction() {
    if (this.isPlaying && this.backgroundMusic && this.backgroundMusic.paused) {
      this.playBackgroundMusic();
    }
  }
}
