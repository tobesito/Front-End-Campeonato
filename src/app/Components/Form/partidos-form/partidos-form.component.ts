import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Partido } from 'src/app/Models/partido.model';
import { PartidosService } from 'src/app/Services/partidos.service';

@Component({
  selector: 'app-partidos-form',
  templateUrl: './partidos-form.component.html',
  styleUrls: ['./partidos-form.component.scss']
})
export class PartidosFormComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private partidoService: PartidosService) {
  }

  loading = true;
  modoEditar: boolean = false;

  partido: Partido = {
    fecha_hora: '',
    orden_partido: null,
    estado: ''
  }

  ngOnInit(): void {
    this.modoEditar = this._router.url.indexOf('editar') !== -1;
 

    const id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    if (id) {
      this.getPartido(id);
    }
  }

  sendPartido() {
    this.partidoService.postPartido(this.partido).subscribe(data => {});
  }

  updatePartido() {
    this.partidoService.updatePartido(this.partido).subscribe(data => {
    });
  }

  getPartido(id) {
    this.partidoService.getPartido(id)
      .subscribe(
        partido => (
          this.partido = partido,
          this.loading = false
        ),
        err => {
          alert(`partido no encontrada (${id}):\n` +
            `${err.message}`)
          // this.volverAlListado(this._router)
        }
      )
  }

}
