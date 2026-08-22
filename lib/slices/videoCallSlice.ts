export interface Participants {
    telemedic_uuid: string;
    patient_uuid: string;
    supervisor_uuid: string;
}

export interface VideoCallSlice {
    callId: string; // Use this to create a call ID ?
    /**
     * Member information
     */
    telemedic_uuid: string; 
    patient_uuid: string;
    supervisor_uuid: string;    

    setParticipants: ( telemedic_uuid: string, patient_uuid: string, supervisor_uuid: string )=> void;

    setCallID: ( callId : string )=>void;

    getParticipantsUUID: ()=>Participants;
    
    getCallId: ()=>string;
}