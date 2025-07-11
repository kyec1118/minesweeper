import { Component, input, output } from '@angular/core';
import { Cell, CellStatusType } from '../../models/cell.model';
@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss',
})
export class CellComponent {
  readonly cell = input.required<Cell>();
  readonly cellClicked = output<Cell>();
  readonly cellFlagged = output<Cell>();
  readonly cellPressed = output<Boolean>();
  readonly CellStatusType = CellStatusType;

  isPressed = false;

  onMouseDown() {
    this.isPressed = true;
    this.cellPressed.emit(true);
  }

  onMouseUp() {
    this.isPressed = false;
    this.cellPressed.emit(false);
  }

  onMouseLeave() {
    this.isPressed = false;
    this.cellPressed.emit(false);
  }

  onCellClick() {
    this.cellClicked.emit(this.cell());
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.cellFlagged.emit(this.cell());
  }
}
