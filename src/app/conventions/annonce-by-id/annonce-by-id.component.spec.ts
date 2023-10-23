import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceByIDComponent } from './annonce-by-id.component';

describe('AnnonceByIDComponent', () => {
  let component: AnnonceByIDComponent;
  let fixture: ComponentFixture<AnnonceByIDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnonceByIDComponent]
    });
    fixture = TestBed.createComponent(AnnonceByIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
