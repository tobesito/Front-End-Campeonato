import { Injectable } from '@angular/core';
import { Etapa } from '../Models/etapa.model';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EtapasService {

  constructor(private http: HttpClient) { 
    this.backEndURL = 'http://localhost:3000';
  }

  backEndURL: string;

  getEtapa(id: number): Observable<any> {
    return this.http.get(`${this.backEndURL}/etapas/${id}`);
  }

  getAllEtapas(): Observable<any> {
    return this.http.get(`${this.backEndURL}/etapas`);
  }

  postEtapa(etapa: Etapa) {
    return this.http.post(`${this.backEndURL}/etapas`,etapa);
  }

  updateEtapa(etapa: Etapa) {
    return this.http.put(`${this.backEndURL}/etapas/${etapa.etapa_id}`,etapa);
  }

  deleteEtapa(id: number) {
    return this.http.delete(`${this.backEndURL}/etapas/${id}`);
  }
}
