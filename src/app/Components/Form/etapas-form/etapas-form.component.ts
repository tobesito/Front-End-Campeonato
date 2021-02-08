import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Etapa } from 'src/app/Models/etapa.model';
import { Jugador } from 'src/app/Models/jugador.model';
import { EtapasService } from 'src/app/Services/etapas.service';

@Component({
  selector: 'app-etapas-form',
  templateUrl: './etapas-form.component.html',
  styleUrls: ['./etapas-form.component.scss']
})
export class EtapasFormComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private _router: Router,
              private etapaService: EtapasService) {
  }

  loading = true;
  modoEditar: boolean = false;

  etapa: Etapa = {
    nombre: '',
    anterior_etapa_id: null,
    siguiente_etapa_id: null,
    torneo_id: null
  }

  jugadores: Jugador[];

  ngOnInit(): void {
    this.modoEditar = this._router.url.indexOf('editar') !== -1;
 
    const id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    if (id) {
      this.getEtapa(id);
    }
  }

  sendEtapa() {
    this.etapaService.postEtapa(this.etapa).subscribe(data => {});
  }

  updateEtapa() {
    this.etapaService.updateEtapa(this.etapa).subscribe(data => {
    });
  }

  getEtapa(id) {
    this.etapaService.getEtapa(id)
      .subscribe(
        etapa => (
          this.etapa = etapa,
          this.loading = false
        ),
        err => {
          alert(`etapa no encontrada (${id}):\n` +
            `${err.message}`)
          // this.volverAlListado(this._router)
        }
      )
  }

  getJugadoresByEtapa(){

  }


}
