import { Component, inject, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { FormsModule } from '@angular/forms';
import {
  GameStatusType,
  GameDifficulty,
} from '../../models/game-settings.model';
@Component({
  selector: 'app-board-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './board-header.component.html',
  styleUrl: './board-header.component.scss',
})
export class BoardHeaderComponent {
  readonly gameService = inject(GameService);
  readonly gameStatus = this.gameService.gameStatus;
  readonly gameTime = this.gameService.gameTime;
  readonly GameStatusType = GameStatusType;
  selectedDifficulty: GameDifficulty = this.gameService.difficulty;

  currentEmoji = this.gameService.currentEmoji;

  restartGame() {
    this.gameService.startGame();
  }

  formatTime(sec: number) {
    const mins = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');

    const secs = (sec % 60).toString().padStart(2, '0');

    return `${mins}:${secs}`;
  }

  updateDifficulty() {
    this.gameService.setDifficulty(this.selectedDifficulty);
  }
}
