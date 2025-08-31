import { Component } from '@angular/core';
import { MinesweeperBoardHeaderComponent } from '../minesweeper-board-header/minesweeper-board-header.component';
import { MinesweeperBoardComponent } from '../minesweeper-board/minesweeper-board.component';

@Component({
  selector: 'app-minesweeper-frame',
  standalone: true,
  imports: [MinesweeperBoardHeaderComponent, MinesweeperBoardComponent],
  templateUrl: './minesweeper-frame.component.html',
  styleUrl: './minesweeper-frame.component.scss',
})
export class MinesweeperFrameComponent {}
