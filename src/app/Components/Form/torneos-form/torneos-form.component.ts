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

  torneoid: number;
  nombre: string;
  lugar: string;
  fechaInicio: Date;
  fechaFin: Date;
  jugadoresPorEquipo: number;
  observaciones: string;

  ngOnInit(): void {
    this.modoEditar = this._router.url.indexOf('editar') !== -1;
    const id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    if (id) {
      this.getTorneo(id);
    }
  }

  sendTorneo() {
    const torneo: Torneo = {
      nombre: this.nombre,
      lugar: this.lugar,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      jugadoresPorEquipo: this.jugadoresPorEquipo,
      observaciones: this.observaciones,
    }

    this.torneoService.postTorneo(torneo).subscribe(data => {});
  }

  updateTorneo() {
    const torneo: Torneo = {
      torneoid: this.torneoid,
      nombre: this.nombre,
      lugar: this.lugar,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      jugadoresPorEquipo: this.jugadoresPorEquipo,
      observaciones: this.observaciones,
    }

    this.torneoService.updateTorneo(torneo).subscribe(data => {
    });
  }

  getTorneo(id) {
    this.torneoService.getTorneo(id)
      .subscribe(
        torneo => (
          this.torneoid = torneo.torneoid,
          this.nombre = torneo.nombre,
          this.lugar = torneo.lugar,
          this.fechaInicio = torneo.fechaInicio,
          this.fechaFin = torneo.fechaFin,
          this.jugadoresPorEquipo = torneo.jugadoresPorEquipo,
          this.observaciones = torneo.observaciones
        ),
        err => {
          alert(`torneo no encontrada (${id}):\n` +
            `${err.message}`)
          // this.volverAlListado(this._router)
        }
      )
  }

}
