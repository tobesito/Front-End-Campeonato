import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Etapa } from 'src/app/Models/etapa.model';
import { Torneo } from 'src/app/Models/torneo.model';
import { EtapasService } from 'src/app/Services/etapas.service';
import { TorneosService } from 'src/app/Services/torneos.service';

@Component({
  selector: 'app-torneos-form',
  templateUrl: './torneos-form.component.html',
  styleUrls: ['./torneos-form.component.scss']
})
export class TorneosFormComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private torneoService: TorneosService,
    private etapaService: EtapasService) {
  }

  loading = true;
  modoEditar: boolean = false;
  modoVer: boolean = false;
  verEtapa: boolean = false;

  nombre_etapa: string = '';

  torneo: Torneo = {
    nombre: "",
    lugar: "",
    fecha_inicio: null,
    fecha_fin: null,
    cantidad_equipos: null,
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

  crearEtapa(){
    var etapa: Etapa = {
      nombre: "",
      anterior_etapa_id: null,
      siguiente_etapa_id: null
    }

    if(this.nombre_etapa != ''){
      etapa.nombre = this.nombre_etapa;
      etapa.torneo_id = this.torneo.torneo_id;

      this.etapaService.postEtapa(etapa).subscribe(data => { });
    } else {
      alert("El nombre de la etapa no puede estar vacío");
    }
  }

}
