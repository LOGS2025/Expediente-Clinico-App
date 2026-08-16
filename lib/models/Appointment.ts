import dayjs, { Dayjs } from "dayjs"

export type AppointmentSlice = {
    pending: boolean,
    date: Dayjs,
    motif: string,
    pacient_uuid: string,
    doctor_uuid: string,
    supervisor_uuid: string | null
};
