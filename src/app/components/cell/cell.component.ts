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
  readonly CellStatusType = CellStatusType;

  onCellClick() {
    this.cellClicked.emit(this.cell());
    console.log(`Cell clicked: (${this.cell().x}, ${this.cell().y})`);
  }
}
