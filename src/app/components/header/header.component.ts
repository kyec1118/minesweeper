import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { AudioService } from '../../services/audio.service';
import { FirebaseService } from '../../services/firebase.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
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
export class HeaderComponent implements OnInit, OnDestroy {
  gameService = inject(GameService);
  audioService = inject(AudioService);
  firebaseService = inject(FirebaseService);
  router = inject(Router);
  
  // Sidebar menu state
  isMenuOpen = false;
  
  // Auth state
  currentUser: User | null | undefined | any = undefined;
  private userSubscription: Subscription | null = null;

  ngOnInit() {
    // Subscribe to auth state changes
    this.userSubscription = this.firebaseService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      console.log('currentUser:', user);
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  async logout() {
    try {
      await this.firebaseService.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

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
