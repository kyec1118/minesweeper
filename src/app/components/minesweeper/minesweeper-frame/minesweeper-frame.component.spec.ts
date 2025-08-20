import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperFrameComponent } from './minesweeper-frame.component';

describe('MinesweeperFrameComponent', () => {
  let component: MinesweeperFrameComponent;
  let fixture: ComponentFixture<MinesweeperFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinesweeperFrameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinesweeperFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
