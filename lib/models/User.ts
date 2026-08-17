import { ComponentType } from "react";
import { Role } from "../utils/types";

export interface User {
    user_id: string;
    nombre: string;
    apellido_p : string;
    apellido_m : string;

    email?: string;
    phone?: string;

    role: Role;
}
