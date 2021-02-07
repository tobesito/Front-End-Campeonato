import { Jugador } from "./jugador.model";

export interface Equipo {
    equipo_id?: number;
    nombre: string;
    pais_representado: string;
    club?: string;
    entrenador: string;

    jugadores?: Jugador[];
};