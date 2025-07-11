import { Component } from '@angular/core';
import { BoardComponent } from './components/board/board.component';
import { HeaderComponent } from './components/header/header.component';
import { FrameComponent } from './components/frame/frame.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BoardComponent, HeaderComponent, FrameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
