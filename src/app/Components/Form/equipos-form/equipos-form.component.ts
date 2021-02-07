import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/Models/equipo.model';
import { EquiposService } from 'src/app/Services/equipos.service';

@Component({
  selector: 'app-equipos-form',
  templateUrl: './equipos-form.component.html',
  styleUrls: ['./equipos-form.component.scss']
})
export class EquiposFormComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private equipoService: EquiposService) {
  }

  loading = true;
  modoEditar: boolean = false;


  equipoid: number;
  nombre: string;
  paisRepresentado: string;
  club: string;
  entrenador: string;

  torneoid: number;
  jugadoresPorEquipo: number;

  ngOnInit(): void {
    this.modoEditar = this._router.url.indexOf('editar') !== -1;
 

    const id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    if (id) {
      this.getEquipo(id);
    }
  }

  // sendEquipo() {
  //   const equipo: Equipo = {
  //     nombre: this.nombre,
  //     paisRepresentado: this.paisRepresentado,
  //     club: this.club,
  //     entrenador: this.entrenador,
  //   }

  //   this.equipoService.postEquipo(equipo).subscribe(data => {});
  // }

  // updateEquipo() {
  //   const equipo: Equipo = {
  //     equipoid: this.equipoid,
  //     nombre: this.nombre,
  //     paisRepresentado: this.paisRepresentado,
  //     club: this.club,
  //     entrenador: this.entrenador,
  //   }

  //   this.equipoService.updateEquipo(equipo).subscribe(data => {
  //   });
  // }

  getEquipo(id) {
    this.equipoService.getEquipo(id)
      .subscribe(
        equipo => (
          this.equipoid = equipo.equipoid,
          this.nombre = equipo.nombre,
          this.paisRepresentado = equipo.paisRepresentado,
          this.club = equipo.club,
          this.entrenador = equipo.entrenador
        ),
        err => {
          alert(`equipo no encontrada (${id}):\n` +
            `${err.message}`)
          // this.volverAlListado(this._router)
        }
      )
  }


}
