import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOneactiviteComponent } from './dashboard-oneactivite.component';

describe('DashboardOneactiviteComponent', () => {
  let component: DashboardOneactiviteComponent;
  let fixture: ComponentFixture<DashboardOneactiviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardOneactiviteComponent]
    });
    fixture = TestBed.createComponent(DashboardOneactiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
