import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LeaderboardEntry, LeaderboardService } from '../../../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  private leaderboardSubject = new BehaviorSubject<LeaderboardEntry[]>([]);
  leaderboard$: Observable<LeaderboardEntry[]> = this.leaderboardSubject.asObservable();
  loading = false;
  error: string | null = null;

  constructor(private leaderboardService: LeaderboardService) {}

  async ngOnInit() {
    await this.loadLeaderboard();
  }

  async loadLeaderboard() {
    this.loading = true;
    this.error = null;
    
    try {
      const leaderboardData = await this.leaderboardService.getLeaderboard();
      
      // Add rank numbers
      const rankedData = leaderboardData.map((entry, index) => ({
        ...entry,
        rank: index + 1
      }));
      
      this.leaderboardSubject.next(rankedData);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Permission denied') || error.message.includes('permissions')) {
          this.error = 'Access denied. Please check Firebase security rules.';
        } else if (error.message.includes('not authenticated')) {
          this.error = 'Please log in to view the leaderboard.';
        } else {
          this.error = 'Failed to load leaderboard. Please try again.';
        }
      } else {
        this.error = 'Failed to load leaderboard. Please try again.';
      }
    } finally {
      this.loading = false;
    }
  }

  async refreshLeaderboard() {
    await this.loadLeaderboard();
  }
}
