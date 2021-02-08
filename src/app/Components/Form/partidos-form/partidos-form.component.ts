import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/Models/equipo.model';
import { Etapa } from 'src/app/Models/etapa.model';
import { Partido } from 'src/app/Models/partido.model';
import { EquiposService } from 'src/app/Services/equipos.service';
import { EtapasService } from 'src/app/Services/etapas.service';
import { PartidosService } from 'src/app/Services/partidos.service';

@Component({
  selector: 'app-partidos-form',
  templateUrl: './partidos-form.component.html',
  styleUrls: ['./partidos-form.component.scss']
})
export class PartidosFormComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private partidoService: PartidosService,
    private etapaService: EtapasService,
    private equipoService: EquiposService) {
  }

  loading = true;
  modoEditar: boolean = false;
  modoVer: boolean = false;

  equipos: Equipo[];

  etapa: Etapa = {
    nombre: ''
  }

  partido: Partido = {
    partido_id: null,
    fecha_hora: '',
    orden_partido: null,
    estado: ''
  }

  ngOnInit(): void {
    this.modoEditar = this._router.url.indexOf('editar') !== -1;
    this.modoVer = this._router.url.indexOf('ver') !== -1;
    const etapa_id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('etapa_id'), 10);
    const id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    
    if (etapa_id) {
      this.getEtapa(etapa_id);
    }
    if (id) {
      this.getPartido(id);
    }

    this.getEquipos();
  }

  sendPartido() {
    this.partido.etapa_id = this.etapa.etapa_id != null ? this.etapa.etapa_id : null;
    this.partidoService.postPartido(this.partido).subscribe(data => { });
  }

  updatePartido() {
    this.partido.etapa_id = this.etapa.etapa_id != null ? this.etapa.etapa_id : null;
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

  getEtapa(etapa_id) {
    this.etapaService.getEtapa(etapa_id)
      .subscribe(
        etapa => (
          this.etapa = etapa
        ),
        err => {
          alert(`Etapa no encontrada (${etapa_id}):\n` +
            `${err.message}`)
          // this.volverAlListado(this._router)
        }
      )
  }

  getEquipos(){
    this.equipoService.getAllEquipos().subscribe(data => {
      this.equipos = data;
    })
  }

  agregarEquipo1(equipo: Equipo){
    if(this.partido.partido_id == null){
      this.partidoService.postPartido(this.partido).subscribe(data => {
        this.getPartido(this.partido.partido_id);
      });
    }
    
    this.partido.equipo1_id = equipo.equipo_id;
    this.partidoService.updatePartido(this.partido).subscribe(data => {
      this.getPartido(this.partido.partido_id);
    });
  }

  agregarEquipo2(equipo: Equipo){
    this.partido.equipo2_id = equipo.equipo_id;
    this.partidoService.updatePartido(this.partido).subscribe(data => {
      this.getPartido(this.partido.partido_id);
    });
  }

  quitarEquipo1(){
    this.partido.equipo1_id = null;
    this.partidoService.updatePartido(this.partido).subscribe(data => {
      this.getPartido(this.partido.partido_id);
    });
  }

  quitarEquipo2(){
    this.partido.equipo2_id = null;
    this.partidoService.updatePartido(this.partido).subscribe(data => {
      this.getPartido(this.partido.partido_id);
    });
  }

}
