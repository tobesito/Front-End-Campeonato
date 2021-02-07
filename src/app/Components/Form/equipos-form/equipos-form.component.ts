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

  equipo: Equipo = {
    nombre: '',
    pais_representado: '',
    club: '',
    entrenador: '',
  }

  ngOnInit(): void {
    this.modoEditar = this._router.url.indexOf('editar') !== -1;
 

    const id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    if (id) {
      this.getEquipo(id);
    }
  }

  sendEquipo() {
    this.equipoService.postEquipo(this.equipo).subscribe(data => {});
  }

  updateEquipo() {
    this.equipoService.updateEquipo(this.equipo).subscribe(data => {
    });
  }

  getEquipo(id) {
    this.equipoService.getEquipo(id)
      .subscribe(
        equipo => (
          this.equipo = equipo,
          this.loading = false
        ),
        err => {
          alert(`equipo no encontrada (${id}):\n` +
            `${err.message}`)
          // this.volverAlListado(this._router)
        }
      )
  }

}
