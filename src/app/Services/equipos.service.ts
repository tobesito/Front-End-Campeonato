import { Injectable } from '@angular/core';
import { Equipo } from '../Models/equipo.model';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private http: HttpClient) { 
    this.backEndURL = 'http://localhost:3000';
  }

  backEndURL: string;

  getEquipo(id: number): Observable<any> {
    return this.http.get(`${this.backEndURL}/equipos/${id}`);
  }

  getAllEquipos(): Observable<any> {
    return this.http.get(`${this.backEndURL}/equipos`);
  }

  postEquipo(equipo: Equipo) {
    return this.http.post(`${this.backEndURL}/equipos`,equipo);
  }

  updateEquipo(equipo: Equipo) {
    return this.http.put(`${this.backEndURL}/equipos/${equipo.equipoid}`,equipo);
  }

  deleteEquipo(id: number) {
    return this.http.delete(`${this.backEndURL}/equipos/${id}`);
  }
}
