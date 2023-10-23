import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdslByidComponent } from './adsl-byid.component';

describe('AdslByidComponent', () => {
  let component: AdslByidComponent;
  let fixture: ComponentFixture<AdslByidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdslByidComponent]
    });
    fixture = TestBed.createComponent(AdslByidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
