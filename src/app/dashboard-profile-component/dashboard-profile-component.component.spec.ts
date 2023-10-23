import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProfileComponentComponent } from './dashboard-profile-component.component';

describe('DashboardProfileComponentComponent', () => {
  let component: DashboardProfileComponentComponent;
  let fixture: ComponentFixture<DashboardProfileComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardProfileComponentComponent]
    });
    fixture = TestBed.createComponent(DashboardProfileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
