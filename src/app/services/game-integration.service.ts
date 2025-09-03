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
        if (currentStatus === GameStatusType.WON) {
          this.handleGameWon();
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
      const difficulty = this.gameService.difficulty; // Get current difficulty

      // Add entry to leaderboard
      await this.leaderboardService.addEntry({
        displayName,
        time,
        difficulty
      });

      console.log('Game result saved to leaderboard!');
      
    } catch (error) {
      console.error('Error saving game result to leaderboard:', error);
    }
  }
}
