import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonAchatByidComponent } from './bon-achat-byid.component';

describe('BonAchatByidComponent', () => {
  let component: BonAchatByidComponent;
  let fixture: ComponentFixture<BonAchatByidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BonAchatByidComponent]
    });
    fixture = TestBed.createComponent(BonAchatByidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
