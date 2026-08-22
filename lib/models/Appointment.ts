import { Participant } from "./User";

export interface Appointment {
    id: number;
    callid: String;
    pending: boolean;

/* fk */    telemedico: Participant;
/* fk */    paciente: Participant;
/* fk */    supervisor: Participant;
};

export interface AppointmentToSupabase {
    callid: String;

/* fk */    telemedic_uuid: String;
/* fk */    patient_uuid: String;
/* fk */    supervisor_uuid: String;
};
