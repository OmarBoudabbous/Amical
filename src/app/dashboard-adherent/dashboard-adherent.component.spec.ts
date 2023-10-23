import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdherentComponent } from './dashboard-adherent.component';

describe('DashboardAdherentComponent', () => {
  let component: DashboardAdherentComponent;
  let fixture: ComponentFixture<DashboardAdherentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardAdherentComponent]
    });
    fixture = TestBed.createComponent(DashboardAdherentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
