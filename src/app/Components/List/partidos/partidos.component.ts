import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Partido } from 'src/app/Models/partido.model';
import { PartidosService } from 'src/app/Services/partidos.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss']
})
export class PartidosComponent implements OnInit {

  loading = true;

  contPartidos = 1;
  partidos: Partido[];
  partidosNoEncontrados: boolean = false;

  constructor(private partidosService: PartidosService) { }


  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.partidosNoEncontrados = false;
    this.partidosService.getAllPartidos().subscribe(data => {
      this.partidos = data;
      if (data.length === 0){
        this.partidosNoEncontrados = true;
      }
      this.loading = false;
    })
  }

  delete(partido: Partido){
    if (window.confirm('Está seguro que desea eliminar a: ' + partido.partido_id + '?')){
      this.partidosService.deletePartido(partido.partido_id).subscribe(data =>{
        if(data && data['affected']){
          this.refresh();
        }
      });
    }
  }

}
