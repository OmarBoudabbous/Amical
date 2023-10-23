import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileInternetByidComponent } from './mobile-internet-byid.component';

describe('MobileInternetByidComponent', () => {
  let component: MobileInternetByidComponent;
  let fixture: ComponentFixture<MobileInternetByidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileInternetByidComponent]
    });
    fixture = TestBed.createComponent(MobileInternetByidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
