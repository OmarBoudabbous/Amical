import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceAdminComponent } from './annonce-admin.component';

describe('AnnonceAdminComponent', () => {
  let component: AnnonceAdminComponent;
  let fixture: ComponentFixture<AnnonceAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnonceAdminComponent]
    });
    fixture = TestBed.createComponent(AnnonceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
