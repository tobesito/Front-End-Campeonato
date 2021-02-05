import { Injectable } from '@angular/core';
import { Torneo } from '../Models/torneo.model';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TorneosService {

  constructor(private http: HttpClient) { 
    this.backEndURL = 'http://localhost:3000';
  }

  backEndURL: string;

  getTorneo(id: number): Observable<any> {
    return this.http.get(`${this.backEndURL}/torneos/${id}`);
  }

  getAllTorneos(): Observable<any> {
    return this.http.get(`${this.backEndURL}/torneos`);
  }

  postTorneo(torneo: Torneo) {
    return this.http.post(`${this.backEndURL}/torneos`,torneo);
  }

  updateTorneo(torneo: Torneo) {
    return this.http.put(`${this.backEndURL}/torneos/${torneo.torneoid}`,torneo);
  }

  deleteTorneo(id: number) {
    return this.http.delete(`${this.backEndURL}/torneos/${id}`);
  }
}
