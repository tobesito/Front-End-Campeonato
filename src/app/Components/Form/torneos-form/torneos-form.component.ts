import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Etapa } from 'src/app/Models/etapa.model';
import { Partido } from 'src/app/Models/partido.model';
import { Torneo } from 'src/app/Models/torneo.model';
import { EtapasService } from 'src/app/Services/etapas.service';
import { PartidosService } from 'src/app/Services/partidos.service';
import { TorneosService } from 'src/app/Services/torneos.service';

@Component({
  selector: 'app-torneos-form',
  templateUrl: './torneos-form.component.html',
  styleUrls: ['./torneos-form.component.scss']
})
export class TorneosFormComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private torneoService: TorneosService,
    private etapaService: EtapasService,
    private partidoService: PartidosService) {
  }

  // booleanas para validaciones de controles y demás
  loading = true;
  modoEditar: boolean = false;
  modoVer: boolean = false;
  verEtapa: boolean = false;
  validar_ver_mas: boolean = false;
  ver_mas: boolean = false;

  nombre_etapa: string = '';

  etapas: Etapa[];
  torneo: Torneo = {
    nombre: "",
    lugar: "",
    fecha_inicio: null,
    fecha_fin: null,
    cantidad_equipos: null,
    jugadores_por_equipo: null,
    observaciones: ""
  };

  // Indice utilizado para la seleccion de etapas del torneo
  indiceSeleccionado: number = -1;

  ngOnInit(): void {
    // Busca en la ruta los valores "editar o ver" para activar los modos(variables booleanas) y 
    // con ellas restringir/activar ciertos controles en el html
    this.modoEditar = this._router.url.indexOf('editar') !== -1;
    this.modoVer = this._router.url.indexOf('ver') !== -1;

    //Toma el valor del "id" que se está pasando en la ruta, para luego obtener el torneo a editar
    const id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    if (id) {
      this.getTorneo(id);
    }
  }

  sendTorneo() {
    this.torneoService.postTorneo(this.torneo).subscribe(data => { });
  }

  updateTorneo() {
    this.torneoService.updateTorneo(this.torneo).subscribe(data => {
    });
  }

  // Sirve tambien para "refrescar" el Torneo cuando se está editando
  getTorneo(id) {
    this.torneoService.getTorneo(id)
      .subscribe(
        torneo => (
          this.torneo = torneo,
          this.etapas = torneo.etapas,
          this.ordenar(),
          this.loading = false,
          this.indiceSeleccionado = this.etapas.length > 0 ? 0 : null,
          this.validarVerMas()
        ),
        err => {
          alert(`torneo no encontrada (${id}):\n` +
            `${err.message}`)
          // this.volverAlListado(this._router)
        }
      )
  }

  crearEtapa() {
    var etapa: Etapa = {
      nombre: "",
      anterior_etapa_id: null,
      siguiente_etapa_id: null
    }

    //Valida que el nombre de la etapa no esté vacio
    if (this.nombre_etapa != '') {
      etapa.nombre = this.nombre_etapa;
      etapa.torneo_id = this.torneo.torneo_id;

      this.etapaService.postEtapa(etapa).subscribe(data => { });
    } else {
      alert("El nombre de la etapa no puede estar vacío");
    }
  }

  crearSiguienteEtapa() {
    //valida que el nombre sea correcto..
    if (this.validarNombreEtapa()) {
      // ..Valida que la cantidad de etapas que tiene el torneo sea menor
      // a la cantidad de etapas que puede contener el torneo..
      if (this.torneo.etapas.length < this.calcularCantidadEtapas()) {
        var etapa: Etapa = {
          nombre: this.nombre_etapa,
          torneo_id: this.torneo.torneo_id
        }
        this.etapaService.postEtapa(etapa).subscribe(data => {
          this.getTorneo(this.torneo.torneo_id);
          this.nombre_etapa = '';
          alert(data);
        });
      } else {
        alert("Ha alcanzado el límite de etapas que puede tener el partido.");
      }
    } else {
      alert("Nombre de Etapa no valido: " + this.nombre_etapa);
    }
  }

  crearPartido() {
    var partido: Partido = {
      orden_partido: this.torneo.etapas[this.indiceSeleccionado].partidos.length + 1,
      estado: 'pendiente'
    }
    partido.etapa_id = this.torneo.etapas[this.indiceSeleccionado].etapa_id;

    this.partidoService.postPartido(partido).subscribe(data => {
      this.getTorneo(this.torneo.torneo_id);
      this.nombre_etapa = '';
      alert(data);
    });
  }

  crearPartidoSiguienteEtapa() {
    // itera sobre los partidos de la etapa seleccionada del torneo "de a 2 partidos",
    // entonces va seleccionando los equipos ganadores de cada 2 partidos y con ellos,
    // crea los partidos de la siguiente etapa
    for (var i = 0, j = 1; i < this.torneo.etapas[this.indiceSeleccionado].partidos.length; i += 2, j++) {
      // Inicializo los nuevos partidos para la siguiente etapa
      var partido: Partido = {
        orden_partido: j,
        estado: 'pendiente',
        etapa_id: this.torneo.etapas[this.indiceSeleccionado + 1].etapa_id
      }
      // Armo equipo 1 a partir del partido "par" de la etapa anterior
      // Si los puntos del equipo 1 son mayores que los del equipo 2, entonces el equipo 1 pasa a la siguiente etapa
      partido.equipo1_id = this.torneo.etapas[this.indiceSeleccionado].partidos[i].puntos_equipo1 >
        this.torneo.etapas[this.indiceSeleccionado].partidos[i].puntos_equipo2 ?
        this.torneo.etapas[this.indiceSeleccionado].partidos[i].equipo1.equipo_id :
        this.torneo.etapas[this.indiceSeleccionado].partidos[i].equipo2.equipo_id;

      // Armo equipo 1 a partir del partido "impar" de la etapa anterior
      // Si los puntos del equipo 1 son mayores que los del equipo 2, entonces el equipo 1 pasa a la siguiente etapa
      partido.equipo2_id = this.torneo.etapas[this.indiceSeleccionado].partidos[i + 1].puntos_equipo1 >
        this.torneo.etapas[this.indiceSeleccionado].partidos[i + 1].puntos_equipo2 ?
        this.torneo.etapas[this.indiceSeleccionado].partidos[i + 1].equipo1.equipo_id :
        this.torneo.etapas[this.indiceSeleccionado].partidos[i + 1].equipo2.equipo_id;

      this.partidoService.postPartido(partido).subscribe(data => {
      });
    }
    this.getTorneo(this.torneo.torneo_id);
  }

  borrarPartido(partido: Partido) {
    if (window.confirm('Está seguro que desea eliminar a: ' + partido.orden_partido + '?')) {
      this.partidoService.deletePartido(partido.partido_id).subscribe(data => {
        this.getTorneo(this.torneo.torneo_id);
      });
    }
  }

  finalizarEtapa() {
    var crear: Boolean = true;
    //Si en los partidos de la etapa seleccionada..
    this.torneo.etapas[this.indiceSeleccionado].partidos.forEach(partido => {
      //no esta terminado.. = no deja crear siguiente etapa
      if (partido.estado != "terminado") {
        crear = false;
      }
    });


    if (crear) {
      this.crearPartidoSiguienteEtapa();
      alert("Etapa creada correctamente!");
    } else {
      alert("Debe finalizar los partidos de la etapa seleccionada para poder pasar a la siguiente.");
    }
  }

  
  // Auxiliares

  calcularCantidadEtapas(): number {
    var cantidad_etapas: number = 0;

    for (var i = this.torneo.cantidad_equipos; i > 1; i /= 2) {
      cantidad_etapas++;
    }
    return cantidad_etapas;
  }

  validarNombreEtapa(): boolean {
    if (this.nombre_etapa == '') {
      return false;
    }
    this.torneo.etapas.forEach(etapa => {
      if (etapa.nombre == this.nombre_etapa) {
        return false;
      }
    });
    return true;
  }

  //true: se ve el boton, false: no se ve
  botonSiguienteEtapa(): boolean {
    if (this.torneo.etapas == null) {
      return false;
    }
    // Si tiene elementos y no supera la cantidad de etapas,
    if (this.torneo.etapas.length > 0 && this.torneo.etapas.length < this.calcularCantidadEtapas()) {
      return true;
    }
    return false;
  }

  ordenar() {
    this.etapas.sort((a, b) => a.etapa_id - b.etapa_id);

    this.etapas.forEach(etapa => {
      etapa.partidos.sort((a, b) => a.orden_partido - b.orden_partido);
    });
  }

  //Verificación para activar/desactivar el botón de "Agregar partido"
  verificarCantidadDePartidosDeEtapa() {
    // Si es la primer etapa..
    if (this.indiceSeleccionado == 0) {
      //..verifica que la cantidad de partidos sea menor a la mitad de la cantidad de equipos en el torneo
      if (this.torneo.etapas[this.indiceSeleccionado].partidos.length < (this.torneo.cantidad_equipos / 2)) {
        return true;
      }
      //Si no es la primer etapa..
    } else if (this.indiceSeleccionado > 0) {
      //..verifica que la cantidad de partidos sea menor a la mitad de la cantidad de partidos de la etapa anterior
      if (this.torneo.etapas[this.indiceSeleccionado].partidos.length < this.torneo.etapas[this.indiceSeleccionado - 1].partidos.length / 2) {
        return true;
      }
    }
    return false;
  }

  // Activado por el boton "Ver", sirve para mostrar/ocultar mas detalles de cada partido de la etapa seleccionada
  verMas() {
    this.ver_mas = !this.ver_mas;
  }

  // Creo que no funciona esto, era para habilitar el boton cuando todos los partidos de la etapa seleccionada esten
  // "terminado"
  validarVerMas() {
    this.torneo.etapas[this.indiceSeleccionado].partidos.forEach(partido => {
      if (partido.estado != "terminado") {
        this.validar_ver_mas = false;
      }
    });
    this.validar_ver_mas = true;
  }

}
