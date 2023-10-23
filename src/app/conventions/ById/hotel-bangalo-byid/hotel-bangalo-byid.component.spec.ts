import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBangaloByidComponent } from './hotel-bangalo-byid.component';

describe('HotelBangaloByidComponent', () => {
  let component: HotelBangaloByidComponent;
  let fixture: ComponentFixture<HotelBangaloByidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelBangaloByidComponent]
    });
    fixture = TestBed.createComponent(HotelBangaloByidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
