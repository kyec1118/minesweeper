import { Injectable } from '@angular/core';
import { DEFAULT_CELL, Cell } from '../models/cell.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  rows = 10;
  columns = 10;
  mines = 10;
  cells: Cell[][] = [];
  constructor() {}
  startGame() {
    // Initialize the game board with default cells
    for (let x = 0; x < this.rows; x++) {
      const row: Cell[] = [];
      for (let y = 0; y < this.columns; y++) {
        row.push(DEFAULT_CELL);
      }
      this.cells.push(row);
    }

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < this.mines) {
      const { x, y } = this.generateMinePosition();
      if (!this.cells[x][y].isMine) {
        this.cells[x][y].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate adjacent mines for each cell
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.columns; y++) {
        if (!this.cells[x][y].isMine) {
          this.cells[x][y].adjacentMines = this.countAdjacentMines(x, y);
        }
      }
    }
  }

  private generateMinePosition(): { x: number; y: number } {
    const x = Math.floor(Math.random() * this.rows);
    const y = Math.floor(Math.random() * this.columns);
    return { x, y };
  }

  private countAdjacentMines(x: number, y: number): number {
    let count = 0;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        // Skip out-of-bounds indices
        if (i < 0 || j < 0 || i >= this.rows || j >= this.columns) {
          continue;
        }
        // Skip the cell itself
        if (i === x && j === y) {
          continue;
        }
        // Count mines in adjacent cells
        if (this.cells[i][j].isMine) {
          count++;
        }
      }
    }
    return count;
  }
}
