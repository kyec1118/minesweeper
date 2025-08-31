import { Component, inject, OnInit } from '@angular/core';
import { Cell } from '../../../models/cell.model';
import { GameService } from '../../../services/game.service';
import { MinesweeperCellComponent } from '../minesweeper-cell/minesweeper-cell.component';

@Component({
  selector: 'app-minesweeper-board',
  standalone: true,
  imports: [MinesweeperCellComponent],
  templateUrl: './minesweeper-board.component.html',
  styleUrl: './minesweeper-board.component.scss',
})
export class MinesweeperBoardComponent implements OnInit {
  private readonly gameService = inject(GameService);
  readonly cells = this.gameService.cells;
  ngOnInit(): void {
    this.gameService.startGame();
  }

  onCellClick(cell: Cell): void {
    this.gameService.revealCell(cell);
  }
  onCellFlagged(cell: Cell): void {
    this.gameService.flagCell(cell);
  }
}
