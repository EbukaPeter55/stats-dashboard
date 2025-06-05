import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGrowthComponent } from './data-growth.component';

describe('DataGrowthComponent', () => {
  let component: DataGrowthComponent;
  let fixture: ComponentFixture<DataGrowthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataGrowthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
