import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIndexComponentComponent } from './dashboard-index-component.component';

describe('DashboardIndexComponentComponent', () => {
  let component: DashboardIndexComponentComponent;
  let fixture: ComponentFixture<DashboardIndexComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardIndexComponentComponent]
    });
    fixture = TestBed.createComponent(DashboardIndexComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
