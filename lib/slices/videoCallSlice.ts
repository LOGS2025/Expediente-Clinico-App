export interface VideoCallSlice {
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
    
    getCallId: ()=>String;
}