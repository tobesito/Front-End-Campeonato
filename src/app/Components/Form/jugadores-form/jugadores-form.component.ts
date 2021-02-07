import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jugador } from 'src/app/Models/jugador.model';
import { JugadoresService } from 'src/app/Services/jugadores.service';

@Component({
  selector: 'app-jugadores-form',
  templateUrl: './jugadores-form.component.html',
  styleUrls: ['./jugadores-form.component.scss']
})
export class JugadoresFormComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private jugadorService: JugadoresService) {
  }

  loading = true;
  modoEditar: boolean = false;

  jugador: Jugador = {
    nombre: '',
    posicion: ''
  };

  ngOnInit(): void {
    this.modoEditar = this._router.url.indexOf('editar') !== -1;
 
    const id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    if (id) {
      this.getJugador(id);
    }
  }

  sendJugador() {
    this.jugadorService.postJugador(this.jugador).subscribe(data => {});
  }

  updateJugador() {
    this.jugadorService.updateJugador(this.jugador).subscribe(data => {
    });
  }

  getJugador(id) {
    this.jugadorService.getJugador(id)
      .subscribe(
        jugador => (
          this.jugador = jugador,
          this.loading = false
        ),
        err => {
          alert(`jugador no encontrada (${id}):\n` +
            `${err.message}`)
          // this.volverAlListado(this._router)
        }
      )
  }

}
