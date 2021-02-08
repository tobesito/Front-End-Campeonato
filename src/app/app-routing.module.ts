import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Home Import
import { HomeComponent } from './Components/home/home.component';

//Lists Imports
import { TorneosComponent } from './Components/List/torneos/torneos.component';
import { PartidosComponent } from './Components/List/partidos/partidos.component';
import { EquiposComponent } from './Components/List/equipos/equipos.component';
import { JugadoresComponent } from './Components/List/jugadores/jugadores.component';

//Form Imports
import { TorneosFormComponent } from './Components/Form/torneos-form/torneos-form.component';
import { EtapasFormComponent } from './Components/Form/etapas-form/etapas-form.component';
import { PartidosFormComponent } from './Components/Form/partidos-form/partidos-form.component';
import { EquiposFormComponent } from './Components/Form/equipos-form/equipos-form.component';
import { JugadoresFormComponent } from './Components/Form/jugadores-form/jugadores-form.component';




const routes: Routes = [

  {path: 'home', component: HomeComponent},

  {path: 'torneos/list', component: TorneosComponent},
  {path: 'torneos/nuevo', component: TorneosFormComponent},
  {path: 'torneos/editar/:id', component: TorneosFormComponent},
  {path: 'torneos/ver/:id', component: TorneosFormComponent},

  // {path: 'etapas/nueva', component: EtapasFormComponent},
  {path: 'etapas/editar/:id', component: EtapasFormComponent},
  {path: 'etapas/nueva/:torneo_id', component: EtapasFormComponent},

  {path: 'partidos/list', component: PartidosComponent},
  {path: 'partidos/nuevo', component: PartidosFormComponent},
  {path: 'partidos/editar/:id', component: PartidosFormComponent},

  {path: 'equipos/list', component: EquiposComponent},
  {path: 'equipos/nuevo', component: EquiposFormComponent},
  {path: 'equipos/editar/:id', component: EquiposFormComponent},

  {path: 'jugadores/list', component: JugadoresComponent},
  {path: 'jugadores/nuevo', component: JugadoresFormComponent},
  {path: 'jugadores/editar/:id', component: JugadoresFormComponent},

  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
