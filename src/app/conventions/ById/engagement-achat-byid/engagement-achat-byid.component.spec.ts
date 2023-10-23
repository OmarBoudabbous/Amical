import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementAchatByidComponent } from './engagement-achat-byid.component';

describe('EngagementAchatByidComponent', () => {
  let component: EngagementAchatByidComponent;
  let fixture: ComponentFixture<EngagementAchatByidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementAchatByidComponent]
    });
    fixture = TestBed.createComponent(EngagementAchatByidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
