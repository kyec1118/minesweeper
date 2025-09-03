import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    GameDifficulty,
    GameStatusType,
} from '../../../models/game-settings.model';
import { GameService } from '../../../services/game.service';
@Component({
  selector: 'app-minesweeper-board-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './minesweeper-board-header.component.html',
  styleUrl: './minesweeper-board-header.component.scss',
})
export class MinesweeperBoardHeaderComponent {
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
