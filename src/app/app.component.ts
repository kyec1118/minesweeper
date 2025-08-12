import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private audioService = inject(AudioService);

  ngOnInit() {
    // Start background music when app initializes
    this.audioService.startBackgroundMusic();
    
    // Enable audio after any user interaction (handles autoplay restrictions)
    document.addEventListener('click', () => {
      this.audioService.enableAudioAfterUserInteraction();
    }, { once: true });
  }
}
