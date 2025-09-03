import { Injectable, effect } from '@angular/core';
import { take } from 'rxjs/operators';
import { GameStatusType } from '../models/game-settings.model';
import { FirebaseService } from './firebase.service';
import { GameService } from './game.service';
import { LeaderboardService } from './leaderboard.service';

@Injectable({
  providedIn: 'root'
})
export class GameIntegrationService {
  private gameAttempts = 0;
  private lastGameStatus: GameStatusType = GameStatusType.NOT_STARTED;

  constructor(
    private gameService: GameService,
    private firebaseService: FirebaseService,
    private leaderboardService: LeaderboardService
  ) {
    // Listen for game status changes using effect
    effect(() => {
      const currentStatus = this.gameService.gameStatus();
      
      // Check for status transitions
      if (this.lastGameStatus !== currentStatus) {
        if (currentStatus === GameStatusType.IN_PROGRESS && this.lastGameStatus === GameStatusType.NOT_STARTED) {
          this.gameAttempts++;
        } else if (currentStatus === GameStatusType.WON) {
          this.handleGameWon();
        } else if (currentStatus === GameStatusType.LOST) {
          // Game lost, attempt count continues for next game
        }
        
        this.lastGameStatus = currentStatus;
      }
    });
  }

  private async handleGameWon() {
    try {
      // Get current user
      const currentUser = await this.firebaseService.getCurrentUser().pipe(take(1)).toPromise();
      
      if (!currentUser) {
        console.log('No user logged in, cannot save to leaderboard');
        return;
      }

      const displayName = currentUser.displayName || currentUser.email || 'Anonymous';
      const time = this.gameService.gameTime();
      const tries = this.gameAttempts;
      const difficulty = this.gameService.difficulty; // Get current difficulty

      // Add entry to leaderboard
      await this.leaderboardService.addEntry({
        displayName,
        time,
        tries,
        difficulty
      });

      console.log('Game result saved to leaderboard!');
      
      // Reset attempts for next game session
      this.resetAttempts();
      
    } catch (error) {
      console.error('Error saving game result to leaderboard:', error);
    }
  }

  resetAttempts() {
    this.gameAttempts = 0;
  }

  getCurrentAttempts(): number {
    return this.gameAttempts;
  }
}
