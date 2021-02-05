import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneosFormComponent } from './torneos-form.component';

describe('TorneosFormComponent', () => {
  let component: TorneosFormComponent;
  let fixture: ComponentFixture<TorneosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorneosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TorneosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
