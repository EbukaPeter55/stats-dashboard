import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueContributionComponent } from './revenue-contribution.component';

describe('RevenueContributionComponent', () => {
  let component: RevenueContributionComponent;
  let fixture: ComponentFixture<RevenueContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueContributionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
