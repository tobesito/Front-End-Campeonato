import { Etapa } from "./etapa.model";

export interface Torneo {
    torneo_id?: number;
	nombre: string;
	lugar: string;
	fecha_inicio: Date;
	fecha_fin: Date;
	cantidad_equipos: number;
	jugadores_por_equipo: number;
	observaciones: string;

	etapas?: Etapa[];
};