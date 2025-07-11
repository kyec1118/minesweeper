import { Component, inject } from '@angular/core';
import { GameService, GameStatusType } from '../../services/game.service';
@Component({
  selector: 'app-board-header',
  standalone: true,
  imports: [],
  templateUrl: './board-header.component.html',
  styleUrl: './board-header.component.scss',
})
export class BoardHeaderComponent {
  readonly gameService = inject(GameService);
  readonly gameStatus = this.gameService.gameStatus;
  readonly gameTime = this.gameService.gameTime;
  readonly GameStatusType = GameStatusType;

  restartGame() {
    console.log('start');
    this.gameService.startGame();
  }

  formatTime(sec: number) {
    const mins = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');

    const secs = (sec % 60).toString().padStart(2, '0');

    return `${mins}:${secs}`;
  }
}
