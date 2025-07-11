import { Component } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { BoardHeaderComponent } from '../board-header/board-header.component';
@Component({
  selector: 'app-frame',
  standalone: true,
  imports: [BoardHeaderComponent, BoardComponent],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss',
})
export class FrameComponent {}
