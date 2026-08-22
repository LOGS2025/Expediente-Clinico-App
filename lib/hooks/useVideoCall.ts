import { create } from 'zustand'
import { VideoCallSlice, Participants } from '../slices/videoCallSlice';


export const useVideoCall = create<VideoCallSlice>((set, get) => ({
    callId: '', // Use this to create a call ID ?
    /**
     * Member information
     */
    telemedic_uuid: '', 
    patient_uuid: '',
    supervisor_uuid: '',

    setParticipants: ( telemedic_uuid: string, patient_uuid: string, supervisor_uuid: string )=>{
        set({telemedic_uuid: telemedic_uuid, patient_uuid: patient_uuid, supervisor_uuid: supervisor_uuid})
    },
    setCallID: ( callId: string)=>{ set({ callId: callId }) },

    getParticipantsUUID: ()=> {
        const doc_uuid = get().telemedic_uuid;
        const pat_uuid = get().patient_uuid;
        const sup_uuid = get().supervisor_uuid;

        const ret : Participants = {
            telemedic_uuid: doc_uuid,
            patient_uuid: pat_uuid,
            supervisor_uuid: sup_uuid,
        }

        return ret;
    },

    getCallId: ()=>{
        return get().callId;
    },
}))
