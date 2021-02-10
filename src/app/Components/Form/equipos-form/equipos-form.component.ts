import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/Models/equipo.model';
import { Jugador } from 'src/app/Models/jugador.model';
import { EquiposService } from 'src/app/Services/equipos.service';
import { JugadoresService } from 'src/app/Services/jugadores.service';

@Component({
  selector: 'app-equipos-form',
  templateUrl: './equipos-form.component.html',
  styleUrls: ['./equipos-form.component.scss']
})
export class EquiposFormComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private equipoService: EquiposService,
    private jugadorService: JugadoresService) {
  }

  loading = true;
  modoEditar: boolean = false;
  jugadoresNoEncontrados: boolean = false;

  equipo: Equipo = {
    nombre: '',
    pais_representado: '',
    club: '',
    entrenador: '',
  }

  jugadores: Jugador[];

  ngOnInit(): void {
    this.modoEditar = this._router.url.indexOf('editar') !== -1;
 
    const id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    if (id) {
      this.getEquipo(id);
    }
    this.getJugadores();
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

  getJugadores(){
    this.jugadoresNoEncontrados = false;
    this.jugadorService.getAllJugadores().subscribe(data => {
      this.jugadores = data;
      if (data.length === 0){
        this.jugadoresNoEncontrados = true;
      }
      this.loading = false;
    })
  }

  agregarAlEquipo(jugador: Jugador){
    jugador.equipo_id = this.equipo.equipo_id;
    this.jugadorService.updateJugador(jugador).subscribe(data => {
      this.getJugadores();
    });
  }

  quitarDelEquipo(jugador: Jugador){
    jugador.equipo_id = null;
    this.jugadorService.updateJugador(jugador).subscribe(data => {
      this.getJugadores();
    });
  }

}
