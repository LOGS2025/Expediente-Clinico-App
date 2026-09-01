/**
 *  El dashboard del Supervisor debe contener 
 *      - una vista de agendas?
 *      - navbar
 *      - sidebar
 *      - Cuenta?
 */

import { useEffect, useState } from "react";
import AppointmentsPanel from "../appointment/AppointmentPanel";
import { Appointment } from "@/lib/models/Appointment";
import { useVideoCall } from "@/lib/hooks/useVideoCall";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/ButtonUniv";
import ErrorMessage from "@/components/ui/Error";
import { getUserAppointments } from "@/lib/supabase/users";
import { useBoundStore } from "@/lib/hooks/useBoundStore";

const PatientDashboardLayout = ()=> {
    const router = useRouter();

    const [appointments, setAppointment] = useState<[Appointment] | null>(null);
    const uuid = useBoundStore((state)=>state.uid);
    const videoCallHandler = useVideoCall((state)=>state);
    const [error, setError] = useState<string | null>(null);
    const [appointmentChosen, setAppointmentChosen] = useState<boolean>(false);

    // Get the appointments from supabase
    useEffect(()=>{
        (async () => {
        const appointmentlist = await getUserAppointments(uuid);
        if ( appointmentlist ) {
            setAppointment(appointmentlist);
        }
        })();
    },[])


    function setAppointmentStore(appointment: Appointment) {
        const telemedic_uuid = appointment.telemedico.usuario.uuid;
        const patient_uuid = appointment.paciente.usuario.uuid;
        const supervisor_uuid = appointment.supervisor.usuario.uuid;
        const callId = appointment.callid;

        if ( !telemedic_uuid || !patient_uuid || !supervisor_uuid ) {
            setError("Missing a participant data");
            return;
        }

        videoCallHandler.setParticipants(
            telemedic_uuid, 
            patient_uuid, 
            supervisor_uuid);

        if ( !callId ) {
            setError("Missing call id!!!");
        }

        setAppointmentChosen(true);
        videoCallHandler.setCallID(callId);
    }
   
    const handleJoin = () => {
        try {
            const callId = videoCallHandler.getCallId()
            router.push(`/meeting/${callId}`);

        } catch (error) {
        console.log(error);
        }
    }

    return (
        <div className="flex flex-row">
            { error && <ErrorMessage message={error}/> }

            {/* Side bar  */}
            <div className="flex-2">
            </div>

            <div className="flex-2 h-dvh">
                <div className="flex flex-row items-center justify-end gap-6">
                    <Button onClick={()=>{
                        if ( appointmentChosen )
                            handleJoin()
                        else 
                            setError("Choose an appointment before joining");
                        }} text="Entrar a la consulta"/>
                </div>
                { appointments &&
                <AppointmentsPanel appointments={appointments} 
                onSelectAppointment={setAppointmentStore}/> }
            </div>

            <div className="flex-2">
            </div>
        </div>
    )
}

export default PatientDashboardLayout;