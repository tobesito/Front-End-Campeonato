import { Equipo } from "./equipo.model";
import { Etapa } from "./etapa.model";

export interface Partido {
    partidoid?: number;
    fechaHora: Date;
    ordenPartido: number;
    //estado: Estado; //pendiente, en juego, terminado, suspendido
    puntosEquipo1: number;
    puntosEquipo2: number;

    equipo1id?: number;
    equipo1?: Equipo;

    equipo2id?: number;
    equipo2?: Equipo;
    
    etapa: Etapa;
    etapaid?: number

};

export enum Estado {
    pendiente = 1,
    enJuego = 2,
    terminado = 3,
    suspendido = 4,
}