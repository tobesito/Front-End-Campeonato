import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvionesLeaComponent } from './aviones-lea.component';

describe('AvionesLeaComponent', () => {
  let component: AvionesLeaComponent;
  let fixture: ComponentFixture<AvionesLeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvionesLeaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvionesLeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
