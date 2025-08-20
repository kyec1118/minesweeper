import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperBoardHeaderComponent } from './minesweeper-board-header.component';

describe('MinesweeperBoardHeaderComponent', () => {
  let component: MinesweeperBoardHeaderComponent;
  let fixture: ComponentFixture<MinesweeperBoardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinesweeperBoardHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinesweeperBoardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
