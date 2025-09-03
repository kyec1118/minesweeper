import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../../services/firebase.service';
import { GameIntegrationService } from '../../../services/game-integration.service';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-game-with-leaderboard',
  template: `
    <div class="game-container">
      <div class="game-header">
        <div class="user-info" *ngIf="currentUser$ | async as user">
          <span>Welcome, {{ user.displayName || user.email }}!</span>
        </div>
        <div class="game-stats">
          <span>Time: {{ gameService.gameTime() }}s</span>
          <span>Status: {{ gameService.gameStatus() }}</span>
        </div>
      </div>
      
      <!-- Your existing minesweeper game components would go here -->
      <!-- <app-minesweeper-frame></app-minesweeper-frame> -->
      
      <div class="leaderboard-section">
        <app-leaderboard></app-leaderboard>
      </div>
    </div>
  `,
  styles: [`
    .game-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }
    
    .game-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }
    
    .user-info span,
    .game-stats span {
      margin-right: 1rem;
      font-weight: 500;
    }
    
    .leaderboard-section {
      margin-top: 2rem;
    }
  `]
})
export class GameWithLeaderboardComponent implements OnInit {
  currentUser$: Observable<User | null | undefined>;

  constructor(
    public gameService: GameService,
    public gameIntegrationService: GameIntegrationService,
    private firebaseService: FirebaseService
  ) {
    this.currentUser$ = this.firebaseService.getCurrentUser();
  }

  ngOnInit() {
    // Initialize game if needed
  }
}
