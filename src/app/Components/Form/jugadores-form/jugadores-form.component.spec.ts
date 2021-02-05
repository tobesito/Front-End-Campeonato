import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadoresFormComponent } from './jugadores-form.component';

describe('JugadoresFormComponent', () => {
  let component: JugadoresFormComponent;
  let fixture: ComponentFixture<JugadoresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugadoresFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadoresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
