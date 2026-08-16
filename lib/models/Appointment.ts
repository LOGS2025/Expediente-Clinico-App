
export interface AppointmentSlice {
    id: number;
    pending: boolean;
    creacion: string;
    fecha: string;
    motif: string;
    doctor: string;
    paciente: string;
    supervisor: string | null;
};

export interface AppointmentToSupabase {
    date: Date;
    motif: string;
    doctor_uuid: string;
    patient_uuid: string;
    supervisor_uuid: string | null;
};
