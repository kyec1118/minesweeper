import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaderboardService } from '../../../services/leaderboard.service';
import { LeaderboardComponent } from './leaderboard.component';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;
  let mockLeaderboardService: jasmine.SpyObj<LeaderboardService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LeaderboardService', ['getLeaderboard']);

    await TestBed.configureTestingModule({
      declarations: [LeaderboardComponent],
      providers: [
        { provide: LeaderboardService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    mockLeaderboardService = TestBed.inject(LeaderboardService) as jasmine.SpyObj<LeaderboardService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load leaderboard on init', async () => {
    const mockData = [
      { displayName: 'Player1', time: 30, tries: 2 },
      { displayName: 'Player2', time: 45, tries: 1 }
    ];
    mockLeaderboardService.getLeaderboard.and.returnValue(Promise.resolve(mockData));

    await component.ngOnInit();

    expect(mockLeaderboardService.getLeaderboard).toHaveBeenCalled();
  });
});
