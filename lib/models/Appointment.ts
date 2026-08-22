import { User } from "./User";

export interface Appointment {
    id: Number;
    callid: String;
    pending: boolean;
    
/* fk */    telemedic: User;
/* fk */    paciente: User;
/* fk */    supervisor: User;
};

export interface AppointmentToSupabase {
    callid: String;

/* fk */    telemedic_uuid: String;
/* fk */    patient_uuid: String;
/* fk */    supervisor_uuid: String;
};
