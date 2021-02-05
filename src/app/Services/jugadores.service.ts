import { Injectable } from '@angular/core';
import { Jugador } from '../Models/jugador.model';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  constructor(private http: HttpClient) { 
    this.backEndURL = 'http://localhost:3000';
  }

  backEndURL: string;

  getJugador(id: number): Observable<any> {
    return this.http.get(`${this.backEndURL}/jugadores/${id}`);
  }

  getAllJugadores(): Observable<any> {
    return this.http.get(`${this.backEndURL}/jugadores`);
  }

  postJugador(jugador: Jugador) {
    return this.http.post(`${this.backEndURL}/jugadores`,jugador);
  }

  updateJugador(jugador: Jugador) {
    return this.http.put(`${this.backEndURL}/jugadores/${jugador.jugadorid}`,jugador);
  }

  deleteJugador(id: number) {
    return this.http.delete(`${this.backEndURL}/jugadores/${id}`);
  }
}
