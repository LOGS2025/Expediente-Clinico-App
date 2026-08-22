import { create } from 'zustand'
import { User } from '../models/User';

interface VideoCallSlice {
    callId: String; // Use this to create a call ID ?
    /**
     * Member information
     */
    telemedic_uuid: String; 
    patient_uuid: String;
    supervisor_uuid: String | null;    

    setParticipants: ( telemedic_uuid: String, patient_uuid: String, supervisor_uuid: String )=> void;

    setCallID: ( callId : String )=>void;

    getParticipantsUUID: ()=>any;
}

export const useVideoCall = create<VideoCallSlice>((set, get) => ({
    callId: '', // Use this to create a call ID ?
    /**
     * Member information
     */
    telemedic_uuid: '', 
    patient_uuid: '',
    supervisor_uuid: '',

    setParticipants: ( telemedic_uuid: String, patient_uuid: String, supervisor_uuid: String )=>{
        set({telemedic_uuid: telemedic_uuid, patient_uuid: patient_uuid, supervisor_uuid: supervisor_uuid})
    },
    setCallID: ( callId: String)=>{ set({ callId: callId }) },

    getParticipantsUUID: ()=>{
        const doc_uuid = get().telemedic_uuid;
        const pat_uuid = get().patient_uuid;
        const sup_uuid = get().supervisor_uuid;

        return {
            telemedic_uuid: doc_uuid,
            pat_uuid: pat_uuid,
            sup_uuid: sup_uuid,
        }
    },
}))
