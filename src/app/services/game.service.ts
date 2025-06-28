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
  }

  private generateMinePosition(): { x: number; y: number } {
    const x = Math.floor(Math.random() * this.rows);
    const y = Math.floor(Math.random() * this.columns);
    return { x, y };
  }
}
