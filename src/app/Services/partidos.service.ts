import { Injectable } from '@angular/core';
import { Partido } from '../Models/partido.model';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private http: HttpClient) { 
    this.backEndURL = 'http://localhost:3000';
  }

  backEndURL: string;

  getPartido(id: number): Observable<any> {
    return this.http.get(`${this.backEndURL}/partidos/${id}`);
  }

  getAllPartidos(): Observable<any> {
    return this.http.get(`${this.backEndURL}/partidos`);
  }

  postPartido(partido: Partido) {
    return this.http.post(`${this.backEndURL}/partidos`,partido);
  }

  updatePartido(partido: Partido) {
    return this.http.put(`${this.backEndURL}/partidos/${partido.partidoid}`,partido);
  }

  deletePartido(id: number) {
    return this.http.delete(`${this.backEndURL}/partidos/${id}`);
  }
}
