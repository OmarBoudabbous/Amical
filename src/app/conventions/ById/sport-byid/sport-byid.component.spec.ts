import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportByidComponent } from './sport-byid.component';

describe('SportByidComponent', () => {
  let component: SportByidComponent;
  let fixture: ComponentFixture<SportByidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SportByidComponent]
    });
    fixture = TestBed.createComponent(SportByidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
