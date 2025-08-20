import {
  Component,
  effect,
  input,
  output,
  signal,
  inject,
} from '@angular/core';
import { Cell, CellStatusType } from '../../../models/cell.model';
import { GameService } from '../../../services/game.service';
@Component({
  selector: 'app-minesweeper-cell',
  standalone: true,
  imports: [],
  templateUrl: './minesweeper-cell.component.html',
  styleUrl: './minesweeper-cell.component.scss',
})
export class MinesweeperCellComponent {
  private readonly gameService = inject(GameService);
  readonly cell = input.required<Cell>();
  readonly cellClicked = output<Cell>();
  readonly cellFlagged = output<Cell>();
  readonly cellPressed = output<Boolean>();
  readonly CellStatusType = CellStatusType;

  private longPressTimeout: any;
  private wasLongPress = false;

  isPressed = signal(false);

  onMouseDown() {
    this.isPressed.set(true);
    this.cellPressed.emit(true);
    this.gameService.setRandomEmoji();
  }

  onMouseUp() {
    this.isPressed.set(false);
    this.cellPressed.emit(false);
    this.gameService.setEmoji('🤔');
  }

  onMouseLeave() {
    this.isPressed.set(false);
    this.cellPressed.emit(false);
  }

  onCellClick() {
    this.cellClicked.emit(this.cell());
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.cellFlagged.emit(this.cell());
  }

  onTouchStart(event: TouchEvent) {
    this.wasLongPress = false;
    this.gameService.setRandomEmoji();
    this.longPressTimeout = setTimeout(() => {
      this.wasLongPress = true;
      this.cellFlagged.emit(this.cell());
      this.isPressed.set(false);
    }, 600);
    this.isPressed.set(true);

    event?.preventDefault();
  }

  onTouchEnd() {
    this.gameService.setEmoji('🤔');
    clearTimeout(this.longPressTimeout);
    if (!this.wasLongPress) {
      this.onCellClick();
    }
    this.isPressed.set(false);
  }

  onTouchCancel() {
    clearTimeout(this.longPressTimeout);
    this.isPressed.set(false);
  }
}
