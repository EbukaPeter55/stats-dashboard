import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTeamMemberComponent } from './delete-team-member.component';

describe('DeleteTeamMemberComponent', () => {
  let component: DeleteTeamMemberComponent;
  let fixture: ComponentFixture<DeleteTeamMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTeamMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
