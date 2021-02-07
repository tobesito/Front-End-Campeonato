import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Torneo } from 'src/app/Models/torneo.model';
import { TorneosService } from 'src/app/Services/torneos.service';

@Component({
  selector: 'app-torneos-form',
  templateUrl: './torneos-form.component.html',
  styleUrls: ['./torneos-form.component.scss']
})
export class TorneosFormComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private torneoService: TorneosService) {
  }

  loading = true;
  modoEditar: boolean = false;
  modoVer: boolean = false;
  verEtapa: boolean = false;

  torneo: Torneo = {
    nombre: "",
    lugar: "",
    fecha_inicio: null,
    fecha_fin: null,
    jugadores_por_equipo: null,
    observaciones: ""
  };

  ngOnInit(): void {
    this.modoEditar = this._router.url.indexOf('editar') !== -1;
    this.modoVer = this._router.url.indexOf('ver') !== -1;

    const id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    if (id) {
      this.getTorneo(id);
    }
  }

  sendTorneo() {
    this.torneoService.postTorneo(this.torneo).subscribe(data => { });
  }

  updateTorneo() {
    this.torneoService.updateTorneo(this.torneo).subscribe(data => {
    });
  }

  getTorneo(id) {
    this.torneoService.getTorneo(id)
      .subscribe(
        torneo => (
          this.torneo = torneo,
          this.loading = false
        ),
        err => {
          alert(`torneo no encontrada (${id}):\n` +
            `${err.message}`)
          // this.volverAlListado(this._router)
        }
      )
  }

}
