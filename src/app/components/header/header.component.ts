import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  gameService = inject(GameService);
}
