import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Jugador } from 'src/app/Models/jugador.model';
import { JugadoresService } from 'src/app/Services/jugadores.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss']
})
export class JugadoresComponent implements OnInit {

  loading = true;

  contJugadores = 1;
  jugadores: Jugador[];
  jugadoresNoEncontrados: boolean = false;

  constructor(private jugadoresService: JugadoresService) { }


  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.jugadoresNoEncontrados = false;
    this.jugadoresService.getAllJugadores().subscribe(data => {
      this.jugadores = data;
      if (data.length === 0){
        this.jugadoresNoEncontrados = true;
      }
      this.loading = false;
    })
  }

  delete(jugador: Jugador){
    if (window.confirm('Está seguro que desea eliminar a: ' + jugador.nombre + '?')){
      this.jugadoresService.deleteJugador(jugador.jugador_id).subscribe(data =>{
        this.refresh();
      });
    }
  }

}
