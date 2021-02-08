import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Etapa } from 'src/app/Models/etapa.model';
import { Partido } from 'src/app/Models/partido.model';
import { Torneo } from 'src/app/Models/torneo.model';
import { EtapasService } from 'src/app/Services/etapas.service';
import { PartidosService } from 'src/app/Services/partidos.service';
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
    private etapaService: EtapasService,
    private partidoService: PartidosService) {
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
  etapaSeleccionada: Etapa;

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
          this.loading = false,
          this.etapaSeleccionada = this.torneo.etapas.length > 0 ? this.torneo.etapas[0] : null
        ),
        err => {
          alert(`torneo no encontrada (${id}):\n` +
            `${err.message}`)
          // this.volverAlListado(this._router)
        }
      )
  }

  crearEtapa() {
    var etapa: Etapa = {
      nombre: "",
      anterior_etapa_id: null,
      siguiente_etapa_id: null
    }

    if (this.nombre_etapa != '') {
      etapa.nombre = this.nombre_etapa;
      etapa.torneo_id = this.torneo.torneo_id;

      this.etapaService.postEtapa(etapa).subscribe(data => { });
    } else {
      alert("El nombre de la etapa no puede estar vacío");
    }
  }

  crearSiguienteEtapa() {
    if (this.validarNombreEtapa()) {
      if (this.torneo.etapas.length < this.calcularCantidadEtapas()) {
        var etapa: Etapa = {
          nombre: this.nombre_etapa,
          torneo_id: this.torneo.torneo_id
        }
        this.etapaService.postEtapa(etapa).subscribe(data => {
          this.getTorneo(this.torneo.torneo_id);
          this.nombre_etapa = '';
          alert(data);
        });
      } else {
        alert("Ha alcanzado el límite de etapas que puede tener el partido.");
      }
    } else {
      alert("Nombre de Etapa no valido: " + this.nombre_etapa);
    }
  }

  calcularCantidadEtapas(): number {
    var cantidad_etapas: number = 0;

    for (var i = this.torneo.cantidad_equipos; i > 1; i /= 2) {
      cantidad_etapas++;
    }
    return cantidad_etapas;
  }

  validarNombreEtapa(): boolean {
    if (this.nombre_etapa == '') {
      return false;
    }
    this.torneo.etapas.forEach(etapa => {
      if (etapa.nombre == this.nombre_etapa) {
        return false;
      }
    });
    return true;
  }

  //true: se ve el boton, false: no se ve
  botonSiguienteEtapa(): boolean {
    if (this.torneo.etapas == null) {
      return false;
    }
    // Si tiene elementos y no supera la cantidad de etapas,
    if (this.torneo.etapas.length > 0 && this.torneo.etapas.length < this.calcularCantidadEtapas()) {
      return true;
    }
    return false;
  }

  crearPartido() {
    var partido: Partido = {
      orden_partido: this.etapaSeleccionada.partidos.length + 1,
      estado: 'pendiente'
    }
    partido.etapa_id = this.etapaSeleccionada.etapa_id;

    this.partidoService.postPartido(partido).subscribe(data => {
      this.getTorneo(this.torneo.torneo_id);
      this.nombre_etapa = '';
      alert(data);
    });
  }

}
