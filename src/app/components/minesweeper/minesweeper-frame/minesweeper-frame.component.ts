import { Component } from '@angular/core';
import { MinesweeperBoardComponent } from '../minesweeper-board/minesweeper-board.component';
import { MinesweeperBoardHeaderComponent } from '../minesweeper-board-header/minesweeper-board-header.component';
@Component({
  selector: 'app-minesweeper-frame',
  standalone: true,
  imports: [MinesweeperBoardHeaderComponent, MinesweeperBoardComponent],
  templateUrl: './minesweeper-frame.component.html',
  styleUrl: './minesweeper-frame.component.scss',
})
export class MinesweeperFrameComponent {}
