import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileInternetComponent } from './mobile-internet.component';

describe('MobileInternetComponent', () => {
  let component: MobileInternetComponent;
  let fixture: ComponentFixture<MobileInternetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileInternetComponent]
    });
    fixture = TestBed.createComponent(MobileInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
