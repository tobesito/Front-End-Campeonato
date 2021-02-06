export interface Torneo {
    torneoid?: number;
	nombre: string;
	lugar: string;
	fechaInicio: Date;
	fechaFin: Date;
	jugadoresPorEquipo: number;
	observaciones: string;
};