import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapasFormComponent } from './etapas-form.component';

describe('EtapasFormComponent', () => {
  let component: EtapasFormComponent;
  let fixture: ComponentFixture<EtapasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapasFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
