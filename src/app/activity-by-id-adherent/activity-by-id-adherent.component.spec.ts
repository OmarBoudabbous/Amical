import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityByIdAdherentComponent } from './activity-by-id-adherent.component';

describe('ActivityByIdAdherentComponent', () => {
  let component: ActivityByIdAdherentComponent;
  let fixture: ComponentFixture<ActivityByIdAdherentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityByIdAdherentComponent]
    });
    fixture = TestBed.createComponent(ActivityByIdAdherentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
