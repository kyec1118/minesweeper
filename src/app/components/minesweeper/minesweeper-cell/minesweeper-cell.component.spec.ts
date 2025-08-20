import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperCellComponent } from './minesweeper-cell.component';

describe('MinesweeperCellComponent', () => {
  let component: MinesweeperCellComponent;
  let fixture: ComponentFixture<MinesweeperCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinesweeperCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinesweeperCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
