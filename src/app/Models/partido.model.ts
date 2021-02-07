import { Equipo } from "./equipo.model";
import { Etapa } from "./etapa.model";

export interface Partido {
    partido_id?: number;
    fecha_hora: Date;
    orden_partido: number;
    //estado: Estado; //pendiente, en juego, terminado, suspendido
    puntos_equipo1: number;
    puntos_equipo2: number;

    equipo1_id?: number;
    equipo1?: Equipo;

    equipo2_id?: number;
    equipo2?: Equipo;
    
    etapa: Etapa;
    etapa_id?: number

};

export enum Estado {
    pendiente = 1,
    en_juego = 2,
    terminado = 3,
    suspendido = 4,
}