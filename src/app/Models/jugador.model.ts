import { Equipo } from "./equipo.model";

export interface Jugador {
    jugador_id: number;
	nombre: string;
    posicion: string;
    
	equipo_id: number;
	equipo: Equipo;
};