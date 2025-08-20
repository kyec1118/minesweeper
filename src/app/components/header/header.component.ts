import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AudioService } from '../../services/audio.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  gameService = inject(GameService);
  audioService = inject(AudioService);
  
  // Sidebar menu state
  isMenuOpen = false;

  toggleMusic() {
    this.audioService.toggleBackgroundMusic();
  }

  get isMusicPlaying() {
    return this.audioService.isBackgroundMusicPlaying();
  }

  // Sidebar menu methods
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
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
