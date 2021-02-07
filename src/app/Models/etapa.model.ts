import { Partido } from "./partido.model";
import { Torneo } from "./torneo.model";

export interface Etapa {
    etapaid?: number;
    nombre: string;

    anteriorEtapaid?: number;
    anteriorEtapa?: Etapa;

    siguienteEtapaid?: number;
    siguienteEtapa?: Etapa;
    
    torneoid: number;
    //torneo: Torneo;

    partidos?: Partido[];
};