import { Component, OnInit } from '@angular/core';
import { Plane } from 'src/app/Models/plane.model';

@Component({
  selector: 'app-aviones-lea',
  templateUrl: './aviones-lea.component.html',
  styleUrls: ['./aviones-lea.component.scss']
})
export class AvionesLeaComponent implements OnInit {

  constructor() { }

  plane: Plane;
  planes: Plane[];
  loading: boolean = true;

  ngOnInit(): void {
    this.planes = [
      {
        marca: 'marca1',
        modelo: 'modelo1',
        denominacion_interna: 'denominacion1',
        capacidad_pasajeros: 100
      },
      {
        marca: 'marca2',
        modelo: 'modelo2',
        denominacion_interna: 'denominacion2',
        capacidad_pasajeros: 200
      },
      {
        marca: 'marca3',
        modelo: 'modelo3',
        denominacion_interna: 'denominacion3',
        capacidad_pasajeros: 300
      },
    ]
    this.plane = {
      marca: 'marca4',
        modelo: 'modelo4',
        denominacion_interna: 'denominacion4',
        capacidad_pasajeros: 400
    }
    this.loading=false;
  }

  test(plane: Plane){
    console.log(plane.marca);
  }

}
