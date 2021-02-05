import { Equipo } from "./equipo.model";

export interface Jugador {
    jugadorid: number;
	nombre: string;
    posicion: string;
    
	equipoid: number;
	equipo: Equipo;
};