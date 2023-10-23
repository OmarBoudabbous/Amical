import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBangaloComponent } from './hotel-bangalo.component';

describe('HotelBangaloComponent', () => {
  let component: HotelBangaloComponent;
  let fixture: ComponentFixture<HotelBangaloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelBangaloComponent]
    });
    fixture = TestBed.createComponent(HotelBangaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
