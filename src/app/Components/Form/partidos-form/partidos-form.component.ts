import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/Models/equipo.model';
import { Etapa } from 'src/app/Models/etapa.model';
import { Partido } from 'src/app/Models/partido.model';
import { Torneo } from 'src/app/Models/torneo.model';
import { EquiposService } from 'src/app/Services/equipos.service';
import { EtapasService } from 'src/app/Services/etapas.service';
import { PartidosService } from 'src/app/Services/partidos.service';
import { TorneosService } from 'src/app/Services/torneos.service';

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
    private equipoService: EquiposService,
    private torneoService: TorneosService) {
  }

  loading = true;
  modoEditar: boolean = false;
  modoVer: boolean = false;

  equipos: Equipo[];

  torneo: Torneo;

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

    // captura el etapa_id desde la ruta para consultar a la bdd la etapa
    const etapa_id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('etapa_id'), 10);
    // captura el id desde la ruta para consultar a la bdd el partido
    const id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);

    if (etapa_id) {
      this.getEtapa(etapa_id);
    }
    if (id) {
      this.getPartido(id);
    }

  }

  // Crea partido
  sendPartido() {
    this.partido.etapa_id = this.etapa.etapa_id != null ? this.etapa.etapa_id : null;
    this.partidoService.postPartido(this.partido).subscribe(data => { });
  }

  // Actualiza partido
  updatePartido() {
    if (this.validarModificacion()) {
      this.partido.etapa_id = this.etapa.etapa_id != null ? this.etapa.etapa_id : null;
      this.partidoService.updatePartido(this.partido).subscribe(data => {
      });
      this.volver(this._router);
    }
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
        }
      )
  }

  getEtapa(etapa_id) {
    this.etapaService.getEtapa(etapa_id)
      .subscribe(
        etapa => (
          this.etapa = etapa,
          this.getTorneo(etapa.torneo_id)
        ),
        err => {
          alert(`Etapa no encontrada (${etapa_id}):\n` +
            `${err.message}`)
        }
      )
  }

  getTorneo(torneo_id) {
    this.torneoService.getTorneo(torneo_id)
      .subscribe(
        torneo => (
          this.torneo = torneo,
          this.getEquipos()
        ),
        err => {
          alert(`Etapa no encontrada (${this.etapa.torneo_id}):\n` +
            `${err.message}`)
        }
      )
  }

  getEquipos() {
    this.equipoService.getAllEquipos().subscribe(nuevosEquipos => {
      this.equipos = nuevosEquipos.filter(equipo => equipo.jugadores.length == this.torneo.jugadores_por_equipo)
    })
  }

  agregarEquipo1(equipo: Equipo) {
    // Si no existe el partido, entonces crea el mismo con la id obtenida
    if (this.partido.partido_id == null) {
      this.partidoService.postPartido(this.partido).subscribe(data => {
        this.getPartido(this.partido.partido_id);
      });
    }

    // Actualiza el partido respecto del equipo 1, es decir, agrega al partido el equipo1
    this.partido.equipo1_id = equipo.equipo_id;
    this.partidoService.updatePartido(this.partido).subscribe(data => {
      this.getPartido(this.partido.partido_id);
    });
  }

  agregarEquipo2(equipo: Equipo) {
    this.partido.equipo2_id = equipo.equipo_id;
    this.partidoService.updatePartido(this.partido).subscribe(data => {
      this.getPartido(this.partido.partido_id);
    });
  }

  quitarEquipo1() {
    this.partido.equipo1_id = null;
    this.partidoService.updatePartido(this.partido).subscribe(data => {
      this.getPartido(this.partido.partido_id);
    });
  }

  quitarEquipo2() {
    this.partido.equipo2_id = null;
    this.partidoService.updatePartido(this.partido).subscribe(data => {
      this.getPartido(this.partido.partido_id);
    });
  }

  validarModificacion() {
    var validar: boolean = false;

    //Valida fecha..
    if (this.partido.fecha_hora != '' || this.partido.fecha_hora != null) {
      validar = true;
    } else {
      alert('Debe ingresar una fecha correcta: ' + this.partido.fecha_hora);
    }

    //valida estado y puntaje
    if (this.partido.estado == "terminado") {
      //si finalizó, y ..
      if (this.partido.puntos_equipo1 != null && this.partido.puntos_equipo2 != null) {
        //.. los partidos no son null
        if (this.partido.puntos_equipo1 != this.partido.puntos_equipo2) {
          //y no es empate
          validar = true;
        } else {
          alert('No puede finalizar un partido en empate!');
        }
      } else {
        alert('Debe ingresar los puntos de cada equipo para finalizar el juego');
      }
    }

    //valida equipos
    if (this.partido.equipo1 != null && this.partido.equipo2 != null) {
      validar = true;
    } else {
      alert('Debe asignar los equipos!')
    }

    return validar;
  }

  //Vuelve a la ruta del torneo desde la que se accedió a este partido
  private volver(router: Router) {
    router.navigate(['/torneos', 'ver', this.etapa.torneo_id])
  }

}
