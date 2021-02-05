import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosFormComponent } from './partidos-form.component';

describe('PartidosFormComponent', () => {
  let component: PartidosFormComponent;
  let fixture: ComponentFixture<PartidosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartidosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
