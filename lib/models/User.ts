import { ComponentType } from "react";
import { Role } from "../utils/types";

export interface User {
    id_string: string;
    name: string;
    email: string;
    phone?: string;

    role: Role;
}
