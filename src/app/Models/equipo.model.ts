import { Jugador } from "./jugador.model";

export interface Equipo {
    equipoid?: number;
    nombre: string;
    paisRepresentado: string;
    club?: string;
    entrenador: string;

    jugadores: Jugador[];
};