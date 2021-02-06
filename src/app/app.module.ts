import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//Lists Imports
import { EquiposComponent } from './Components/List/equipos/equipos.component';
import { JugadoresComponent } from './Components/List/jugadores/jugadores.component';
import { PartidosComponent } from './Components/List/partidos/partidos.component';
import { TorneosComponent } from './Components/List/torneos/torneos.component';

//Form Imports
import { EquiposFormComponent } from './Components/Form/equipos-form/equipos-form.component';
import { EtapasFormComponent } from './Components/Form/etapas-form/etapas-form.component';
import { TorneosFormComponent } from './Components/Form/torneos-form/torneos-form.component';
import { JugadoresFormComponent } from './Components/Form/jugadores-form/jugadores-form.component';
import { PartidosFormComponent } from './Components/Form/partidos-form/partidos-form.component';
import { HomeComponent } from './Components/home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    EquiposComponent,
    JugadoresComponent,
    PartidosComponent,
    TorneosComponent,
    EquiposFormComponent,
    EtapasFormComponent,
    TorneosFormComponent,
    JugadoresFormComponent,
    PartidosFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
