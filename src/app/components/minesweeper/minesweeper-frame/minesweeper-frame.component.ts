import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../../services/firebase.service';
import { GameIntegrationService } from '../../../services/game-integration.service';
import { GameService } from '../../../services/game.service';
import { LeaderboardComponent } from '../../shared/leaderboard/leaderboard.component';
import { MinesweeperBoardHeaderComponent } from '../minesweeper-board-header/minesweeper-board-header.component';
import { MinesweeperBoardComponent } from '../minesweeper-board/minesweeper-board.component';

@Component({
  selector: 'app-minesweeper-frame',
  standalone: true,
  imports: [
    CommonModule,
    MinesweeperBoardHeaderComponent, 
    MinesweeperBoardComponent,
    LeaderboardComponent
  ],
  templateUrl: './minesweeper-frame.component.html',
  styleUrl: './minesweeper-frame.component.scss',
})
export class MinesweeperFrameComponent implements OnInit {
  currentUser$: Observable<User | null | undefined>;
  showLeaderboard = false;

  constructor(
    private gameIntegrationService: GameIntegrationService,
    public gameService: GameService,
    private firebaseService: FirebaseService
  ) {
    this.currentUser$ = this.firebaseService.getCurrentUser();
  }

  ngOnInit() {
    // Game integration service is now active and will track games
  }

  getCurrentAttempts(): number {
    return this.gameIntegrationService.getCurrentAttempts();
  }

  toggleLeaderboard() {
    this.showLeaderboard = !this.showLeaderboard;
  }
}
