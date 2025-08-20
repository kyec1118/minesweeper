import { Component, inject, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { MinesweeperCellComponent } from '../minesweeper-cell/minesweeper-cell.component';
import { Cell } from '../../../models/cell.model';

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
