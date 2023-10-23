import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardActivitiesComponentComponent } from './dashboard-activities-component.component';

describe('DashboardActivitiesComponentComponent', () => {
  let component: DashboardActivitiesComponentComponent;
  let fixture: ComponentFixture<DashboardActivitiesComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardActivitiesComponentComponent]
    });
    fixture = TestBed.createComponent(DashboardActivitiesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
