import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AudioService } from '../../services/audio.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, 
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  gameService = inject(GameService);
  audioService = inject(AudioService);

  toggleMusic() {
    this.audioService.toggleBackgroundMusic();
  }

  get isMusicPlaying() {
    return this.audioService.isBackgroundMusicPlaying();
  }

  // Avatar-related methods
  onProfile() {
    console.log('Profile clicked');
    // TODO: Navigate to profile page
  }

  onSettings() {
    console.log('Settings clicked');
    // TODO: Open settings dialog
  }

  onLogout() {
    console.log('Logout clicked');
    // TODO: Implement logout functionality
  }
}
