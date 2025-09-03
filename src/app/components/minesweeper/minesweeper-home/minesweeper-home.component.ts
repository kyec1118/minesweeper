import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameIntegrationService } from '../../../services/game-integration.service';
import { LeaderboardService } from '../../../services/leaderboard.service';

@Component({
  selector: 'app-minesweeper-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './minesweeper-home.component.html',
  styleUrl: './minesweeper-home.component.scss'
})
export class MinesweeperHomeComponent implements OnInit {
  constructor(
    private router: Router,
    private gameIntegrationService: GameIntegrationService,
    private leaderboardService: LeaderboardService
  ) {
    // Initialize game integration service for tracking
  }

  async ngOnInit() {
    // Initialize the leaderboard collection (creates empty collection if needed)
    await this.leaderboardService.initializeLeaderboard();
  }

  navigateToGame() {
    this.router.navigate(['/minesweeper/game']);
  }
}
