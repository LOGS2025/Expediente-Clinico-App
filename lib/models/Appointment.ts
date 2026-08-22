import { Participant } from "./User";

export interface Appointment {
    id: number;
    callid: string;
    pending: boolean;

/* fk */    telemedico: Participant;
/* fk */    paciente: Participant;
/* fk */    supervisor: Participant;
};

export interface AppointmentToSupabase {
    callid: string;

/* fk */    telemedic_uuid: string;
/* fk */    patient_uuid: string;
/* fk */    supervisor_uuid: string;
};
