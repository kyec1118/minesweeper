import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MinesweeperHomeComponent } from './minesweeper-home.component';

describe('MinesweeperHomeComponent', () => {
  let component: MinesweeperHomeComponent;
  let fixture: ComponentFixture<MinesweeperHomeComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [MinesweeperHomeComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinesweeperHomeComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to minesweeper game when play button is clicked', () => {
    component.navigateToGame();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/minesweeper/game']);
  });
});
