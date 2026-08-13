import { Patient } from "./Patient";

export interface Appointment {
    Date: string,
    Patient: Patient,
    Motif: string,
    Status: string
};