import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Home Import
import { HomeComponent } from './Components/home/home.component';

//Lists Imports
import { EquiposComponent } from './Components/List/equipos/equipos.component';
// import { EtapasComponent } from './Components/List/etapas/etapas.component';
// import { JugadoresComponent } from './Components/List/jugadores/jugadores.component';
// import { PartidosComponent } from './Components/List/partidos/partidos.component';
// import { TorneosComponent } from './Components/List/torneos/torneos.component';

//Form Imports
import { EquiposFormComponent } from './Components/Form/equipos-form/equipos-form.component';
// import { EtapasFormComponent } from './Components/Form/etapas-form/etapas-form.component';
// import { TorneosFormComponent } from './Components/Form/torneos-form/torneos-form.component';
// import { JugadoresFormComponent } from './Components/Form/jugadores-form/jugadores-form.component';
// import { PartidosFormComponent } from './Components/Form/partidos-form/partidos-form.component';



const routes: Routes = [

  {path: 'home', component: HomeComponent},

  {path: 'equipos/list', component: EquiposComponent},
  {path: 'equipos/nuevo', component: EquiposFormComponent},
  {path: 'equipos/editar/:id', component: EquiposFormComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
