import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private audioService = inject(AudioService);

  ngOnInit() {
    // Music state is now automatically loaded from sessionStorage in AudioService
    // Only start music if it was previously enabled
    if (this.audioService.isBackgroundMusicPlaying() || this.isFirstVisit()) {
      this.audioService.startBackgroundMusic();
    }
    
    // Show audio prompt for first-time visitors
    if (this.isFirstVisit()) {
      this.showAudioPrompt();
    }
    
    // Enable audio after any user interaction (handles autoplay restrictions)
    document.addEventListener('click', () => {
      this.audioService.enableAudioAfterUserInteraction();
    }, { once: true });
  }

  private showAudioPrompt() {
    // Show a subtle notification about music
    setTimeout(() => {
      console.log('🎵 Background music is available! Click anywhere to enable.');
      // You could also show a toast notification here
    }, 1000);
  }

  private isFirstVisit(): boolean {
    // Check if this is the first visit by looking for any stored state
    return !sessionStorage.getItem('minesweeper_music_state');
  }
}
