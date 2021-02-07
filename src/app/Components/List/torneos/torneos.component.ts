import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Torneo } from 'src/app/Models/torneo.model';
import { TorneosService } from 'src/app/Services/torneos.service';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.scss']
})
export class TorneosComponent implements OnInit {

  loading = true;

  contTorneos = 1;
  torneos: Torneo[];
  torneosNoEncontrados: boolean = false;

  constructor(private torneosService: TorneosService) { }


  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.torneosNoEncontrados = false;
    this.torneosService.getAllTorneos().subscribe(data => {
      this.torneos = data;
      if (data.length === 0){
        this.torneosNoEncontrados = true;
      }
      this.loading = false;
    })
  }

  delete(torneo: Torneo){
    if (window.confirm('Está seguro que desea eliminar a: ' + torneo.nombre + '?')){
      this.torneosService.deleteTorneo(torneo.torneo_id).subscribe(data =>{
        if(data && data['affected']){
          this.refresh();
        }
      });
    }
  }

}
