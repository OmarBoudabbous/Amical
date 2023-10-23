import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMaintnenaceComponent } from './home-maintnenace.component';

describe('HomeMaintnenaceComponent', () => {
  let component: HomeMaintnenaceComponent;
  let fixture: ComponentFixture<HomeMaintnenaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMaintnenaceComponent]
    });
    fixture = TestBed.createComponent(HomeMaintnenaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
