import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Equipo } from 'src/app/Models/equipo.model';
import { EquiposService } from 'src/app/Services/equipos.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss']
})
export class EquiposComponent implements OnInit {

  loading = true;

  contEquipos = 1;
  equipos: Equipo[];
  equiposNoEncontrados: boolean = false;

  constructor(private equiposService: EquiposService) { }


  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.equiposNoEncontrados = false;
    this.equiposService.getAllEquipos().subscribe(data => {
      this.equipos = data;
      if (data.length === 0){
        this.equiposNoEncontrados = true;
      }
      this.loading = false;
    })
  }

  delete(equipo: Equipo){
    if (window.confirm('Está seguro que desea eliminar a: ' + equipo.nombre + '?')){
      this.equiposService.deleteEquipo(equipo.equipo_id).subscribe(data =>{
        if(data && data['affected']){
          this.refresh();
        }
      });
    }
  }

}
