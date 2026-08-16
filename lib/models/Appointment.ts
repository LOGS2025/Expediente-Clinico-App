
export interface AppointmentSlice {
    id: number;
    pending: boolean;
    creacion: string;
    fecha: string;
    motif: string;
    fk_doctor: string;
    fk_paciente: string;
    fk_supervisor: string | null;
};

export interface AppointmentToSupabase {
    date: Date;
    motif: string;
    doctor_uuid: string;
    patient_uuid: string;
    supervisor_uuid: string | null;
};
