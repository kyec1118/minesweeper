import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AudioService } from '../../services/audio.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  gameService = inject(GameService);
  audioService = inject(AudioService);

  toggleMusic() {
    this.audioService.toggleBackgroundMusic();
  }

  get isMusicPlaying() {
    return this.audioService.isBackgroundMusicPlaying();
  }
}
