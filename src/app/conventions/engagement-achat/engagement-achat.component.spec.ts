import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementAchatComponent } from './engagement-achat.component';

describe('EngagementAchatComponent', () => {
  let component: EngagementAchatComponent;
  let fixture: ComponentFixture<EngagementAchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementAchatComponent]
    });
    fixture = TestBed.createComponent(EngagementAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
