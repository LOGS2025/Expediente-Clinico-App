/**
 *  El dashboard del Supervisor debe contener 
 *      - una vista de agendas?
 *      - navbar
 *      - sidebar
 *      - Cuenta?
 */

import Sidebar from "@/components/dashboard/Sidebar";
import { ComponentType, useEffect, useState } from "react";
import AppointmentsPanel from "../appointment/AppointmentPanel";
import AppointmentForm from "../appointment/AppointmentForm";
import { Appointment } from "@/lib/models/Appointment";
import { getAppointmentList } from "@/lib/supabase/appointments";
import { useVideoCall } from "@/lib/hooks/useVideoCall";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/ButtonUniv";
import ErrorMessage from "@/components/ui/Error";

const PatientDashboardLayout = ()=> {
    const router = useRouter();

    const [appointments, setAppointment] = useState<[Appointment] | null>(null);
    const [option, setOption] = useState<string>('');
    const [showForm, setShowForm] = useState<boolean>(false);
    const [ActiveItem, setItem] = useState<ComponentType | null >(null);
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
        <div className="flex flex-row">
            { error && <ErrorMessage message={error}/> }

            {/* Side bar  */}
            <div className="flex-1 bg-blue-300">
                <Sidebar ActiveItem={ActiveItem} setItem={setItem}/>
            </div>

            <div className="flex-2 bg-amber-400 h-dvh">
                <div className="flex flex-row items-center justify-end gap-6">
                    <Button onClick={()=>setOption('create')} text="Crear consulta"/>
                    <Button onClick={()=>setOption('consults')} text="Ver Consultas"/>
                    <Button onClick={()=>{
                        if ( appointmentChosen )
                            handleJoin()
                        else 
                            setError("Choose an appointment before joining");
                        }} text="Iniciar consulta"/>
                </div>
                
                {optionDisplay()}
            </div>

            <div className="flex-2 bg-green-400">
                <div>   
                    {ActiveItem ? <ActiveItem/> : <></>}
                </div>
            </div>
        </div>
    )
}

export default PatientDashboardLayout;