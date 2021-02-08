import { Partido } from "./partido.model";
import { Torneo } from "./torneo.model";

export interface Etapa {
    etapa_id?: number;
    nombre: string;

    anterior_etapa_id?: number;
    anteriorEtapa?: Etapa;

    siguiente_etapa_id?: number;
    siguienteEtapa?: Etapa;
    
    torneo_id?: number;
    //torneo: Torneo;

    partidos?: Partido[];
};