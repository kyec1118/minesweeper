import { Injectable, signal, Signal, effect } from '@angular/core';
import { Cell, CellStatusType } from '../models/cell.model';
import { Time } from '@angular/common';

export enum GameStatusType {
  NOT_STARTED,
  IN_PROGRESS,
  WON,
  LOST,
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameStatus = signal<GameStatusType>(GameStatusType.NOT_STARTED);
  rows = 20;
  columns = 20;
  mines = 75;
  private _timer: ReturnType<typeof setInterval> | null = null;
  private _gameTime = signal(0);
  private hasStarted = false;
  private _cells = signal<Cell[][]>([]);

  constructor() {}

  get cells() {
    return this._cells;
  }

  get gameTime(): Signal<number> {
    return this._gameTime;
  }

  startGame() {
    this._gameTime.set(0);
    const newBoard: Cell[][] = [];
    // Initialize the game board with default cells
    for (let x = 0; x < this.rows; x++) {
      const row: Cell[] = [];
      for (let y = 0; y < this.columns; y++) {
        row.push(this.generateNewCell(x, y));
      }
      newBoard.push(row);
    }
    console.log('board initialized');

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < this.mines) {
      const { x, y } = this.generateMinePosition();
      if (!newBoard[x][y].isMine) {
        newBoard[x][y].isMine = true;
        minesPlaced++;
      }
    }

    console.log(`${this.mines} mines placed on the board`);

    this._cells.set(newBoard);

    // Calculate adjacent mines for each cell
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.columns; y++) {
        if (!newBoard[x][y].isMine) {
          newBoard[x][y].adjacentMines = this.countAdjacentMines(x, y);
        }
      }
    }

    this.gameStatus.set(GameStatusType.IN_PROGRESS);
    // Set the started flag to false when game inits
    if (this.hasStarted) {
      this.hasStarted = !this.hasStarted;
    }

    console.log('Game started with the following board:');
    console.table(
      this.cells().forEach((row) => {
        const rowStr = row
          .map((cell) => {
            if (cell.isMine) {
              return '💣'; // M for Mine
            }
            if (cell.adjacentMines === 0) return ' '; // Empty cell
            return cell.adjacentMines.toString(); // Number of adjacent mines
          })
          .join(' ');

        console.log(rowStr);
      })
    );
  }

  revealCell(cell: Cell): void {
    console.log('hasSTarted flag: ', this.hasStarted);
    if (!this.hasStarted) {
      this.hasStarted = true;
      this.startTimer();
      console.log('toggled start game to true');
    }
    if (this.gameStatus() !== GameStatusType.IN_PROGRESS) {
      throw new Error('Game is not in progress');
    }
    if (cell.status === CellStatusType.REVEALED) return;

    cell.status = CellStatusType.REVEALED;
    if (cell.isMine) {
      this.stopTimer();
      this.gameStatus.set(GameStatusType.LOST);
      this.revealMines();
      console.log('Game Over! You hit a mine.');
      return;
    } else if (cell.adjacentMines === 0) {
      this.expandCell(cell.x, cell.y);
    }
  }

  flagCell(cell: Cell): void {
    if (this.gameStatus() !== GameStatusType.IN_PROGRESS) {
      throw new Error('Game is not in progress');
    }

    switch (cell.status) {
      case CellStatusType.REVEALED:
        return;
      case CellStatusType.HIDDEN:
        cell.status = CellStatusType.FLAGGED;
        break;
      case CellStatusType.FLAGGED:
        cell.status = CellStatusType.HIDDEN;
        break;
    }

    if (this.gameIsWon()) {
      this.stopTimer();
      this.gameStatus.set(GameStatusType.WON);
    }
  }
  protected getCell(x: number, y: number): Cell {
    if (x < 0 || y < 0 || x >= this.rows || y >= this.columns) {
      throw new Error('Cell coordinates out of bounds');
    }
    return this.cells()[x][y];
  }

  private generateNewCell(x: number, y: number): Cell {
    return {
      x: x,
      y: y,
      isMine: false,
      adjacentMines: 0,
      status: CellStatusType.HIDDEN,
    };
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
        if (this.cells()[i][j].isMine) {
          count++;
        }
      }
    }
    return count;
  }

  private expandCell(x: number, y: number): void {
    for (let i = x - 1; i <= x + 1; i++) {
      if (i < 0 || i >= this.rows) continue; // Skip out-of-bounds rows
      for (let j = y - 1; j <= y + 1; j++) {
        if (j < 0 || j >= this.columns) continue;
        const adjacentCell = this.getCell(i, j);
        if (
          adjacentCell.status === CellStatusType.HIDDEN &&
          adjacentCell.adjacentMines !== 0
        ) {
          adjacentCell.status = CellStatusType.REVEALED;
        } else {
          this.revealCell(adjacentCell);
        }
      }
    }
  }

  private revealMines(): void {
    this.cells()
      .flat()
      .forEach((cell) => {
        if (cell.isMine) {
          cell.status = CellStatusType.REVEALED;
        }
      });
  }

  private gameIsWon(): boolean {
    return this.cells()
      .flat()
      .every(
        (cell) =>
          (cell.isMine && cell.status === CellStatusType.FLAGGED) ||
          (!cell.isMine && cell.status === CellStatusType.REVEALED)
      );
  }

  startTimer(): void {
    this._timer = setInterval(() => {
      this._gameTime.update((s) => s + 1);
    }, 1000);
  }

  stopTimer(): void {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }
}
