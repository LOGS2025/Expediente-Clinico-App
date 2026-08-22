import { Role } from "../utils/types";

export interface User {
    user_id: string;
    nombre: string;
    apellido_p : string;
    apellido_m : string;
}

export interface Participant {
    creacion: String;
    fk_user_id: String;
    id: Number;
    usuario: User;
}
