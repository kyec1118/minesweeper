import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeaderboardComponent } from './leaderboard.component';

@NgModule({
  declarations: [LeaderboardComponent],
  imports: [CommonModule],
  exports: [LeaderboardComponent]
})
export class LeaderboardModule {}
