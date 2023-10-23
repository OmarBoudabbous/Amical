import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdslComponent } from './adsl.component';

describe('AdslComponent', () => {
  let component: AdslComponent;
  let fixture: ComponentFixture<AdslComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdslComponent]
    });
    fixture = TestBed.createComponent(AdslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
