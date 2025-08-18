import { Component, inject, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { CellComponent } from '../cell/cell.component';
import { Cell } from '../../../models/cell.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CellComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
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
