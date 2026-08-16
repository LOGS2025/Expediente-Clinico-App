import { create } from 'zustand'

interface VideoCallSlice {
    id: number; // Use this to create a call ID ?
    date: string; // Check if user can initialize the call according to the date set

    /**
     * Member information
     */
    doctor_uuid: string; 
    patient_uuid: string;
    supervisor_uuid: string | null;    

    setParticipants: ( participants : any[] )=> void;
    setCallID: ()=>void;

    getParticipantsUUID: ()=>any;
}

export const useVideoCall = create<VideoCallSlice>((set, get) => ({
    id: 0, // Use this to create a call ID ?
    date: '', // Check if user can initialize the call according to the date set

    /**
     * Member information
     */
    doctor_uuid: '', 
    patient_uuid: '',
    supervisor_uuid: null,

    setParticipants: ( participants : any[] )=>{
        if ( participants.length < 3) {
            return;
        }
        // Doctor -> Paciente -> Supervisor
        const doctor = participants[0];
        const paciente  = participants[1];
        const supervisor = participants[2];

        set({doctor_uuid: doctor.user_id, 
            patient_uuid: paciente.user_id, 
            supervisor_uuid: supervisor.user_id ? supervisor.user_id : null})
    },
    setCallID: ()=>{},

    getParticipantsUUID: ()=>{
        const doc_uuid = get().doctor_uuid;
        const pat_uuid = get().patient_uuid;
        const sup_uuid = get().supervisor_uuid == null ? get().supervisor_uuid : null;

        return {
            doctor_uuid: doc_uuid,
            pat_uuid: pat_uuid,
            sup_uuid: sup_uuid,
        }
    },
}))
