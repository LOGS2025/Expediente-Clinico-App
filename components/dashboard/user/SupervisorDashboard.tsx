import { useEffect, useState } from "react";
import AppointmentsPanel from "../appointment/AppointmentPanel";
import AppointmentForm from "../appointment/AppointmentForm";
import { Appointment } from "@/lib/models/Appointment";
import { getAppointmentList } from "@/lib/supabase/appointments";
import { useVideoCall } from "@/lib/hooks/useVideoCall";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/ButtonUniv";
import ErrorMessage from "@/components/ui/Error";
import { useLayout } from "@/providers/LayoutContext";

const SupervisorDashboardLayout = ()=> {
    const router = useRouter();
    const { ActiveItem } = useLayout();

    const [appointments, setAppointment] = useState<[Appointment] | null>(null);
    const [option, setOption] = useState<string>('');
    const videoCallHandler = useVideoCall((state)=>state);
    const [error, setError] = useState<string | null>(null);
    const [appointmentChosen, setAppointmentChosen] = useState<boolean>(false);

    // Get the appointments from supabase
    useEffect(()=>{
        (async () => {
        const appointmentlist = await getAppointmentList();
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

    function optionDisplay() {
        switch (option) {
            case 'create': return <AppointmentForm/>;

            case 'consults': 
            default:
            /* On the same flex, place our db 
            information panel for appointments */
            if ( appointments) { 
                return <AppointmentsPanel appointments={appointments} 
                    onSelectAppointment={setAppointmentStore}/>
            };
        }
    }

    return (
        <div className="flex flex-col lg:flex-row">
            { error && <ErrorMessage message={error}/> }

            <div className="lg:flex-2 h-dvh p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-end w-fit">
                    <Button onClick={()=>setOption('create')} text="Crear consulta"/>
                    <Button onClick={()=>setOption('consults')} text="Ver Consultas"/>
                    <Button onClick={()=>{
                        if ( appointmentChosen )
                            handleJoin()
                        else 
                            setError("Choose an appointment before joining");
                        }} text="Iniciar consulta"/>
                </div>
                
                <div className="flex flex-col w-full items-center justify-center">
                    {optionDisplay()}
                </div>
            </div>

            <div className="z-50 fixed right-0 top-0 h-full">
                {ActiveItem ? <ActiveItem/> : <></>}
            </div>
        </div>
    )
}

export default SupervisorDashboardLayout;