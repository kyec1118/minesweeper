import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minesweeper-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './minesweeper-home.component.html',
  styleUrl: './minesweeper-home.component.scss'
})
export class MinesweeperHomeComponent {
  constructor(private router: Router) {}

  navigateToGame() {
    this.router.navigate(['/minesweeper/game']);
  }
}
