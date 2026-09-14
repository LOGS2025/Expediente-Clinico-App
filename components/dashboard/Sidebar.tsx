'use client';

import { useEffect, useState } from "react";
import AppointmentsPanel from "./appointment/AppointmentPanel";
import { Appointment } from "@/lib/models/Appointment";
import { getAppointmentList } from "@/lib/supabase/appointments";
import { useVideoCall } from "@/lib/hooks/useVideoCall";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/ButtonUniv";
import ErrorMessage from "@/components/ui/Error";
import { useLayout } from "@/providers/LayoutContext";
import { DraggableAppointmentForm } from "../ui/PseudoWindow";

const Sidebar = ()=> {
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
            case 'create': return (
            <DraggableAppointmentForm/>
            );

            case 'consults': 
            /* On the same flex, place our db 
            information panel for appointments */
            if ( appointments) { 
                return (
                    <AppointmentsPanel appointments={appointments} 
                        onSelectAppointment={setAppointmentStore}/>
                )
            };

            default:
                return(<></>)
        }
    }

    return (
    <aside className="text-blue-950 flex flex-col h-full left-0 
    gap-1 p-4 pl-0
    ">
        {/* Display for appointments */}
        <div className="flex flex-col md:items-center md:justify-end w-fit gap-3 mb-10">
            <Button 
            active={option == 'create'}
            onClick={()=>setOption('create')} text="Crear consulta"/>

            <Button 
            active={option == 'consults'}
            onClick={()=>setOption('consults')} text="Ver Consultas"/>

            <Button onClick={()=>{
                if ( appointmentChosen )
                    handleJoin()
                else 
                    setError("Choose an appointment before joining");
                }} text="Iniciar consulta"/>
        </div>

        <div className="flex flex-col w-full items-center justify-center pl-4">
            {optionDisplay()}
        </div>

        <div className="mt-auto p-4">
            <button className="w-full py-3 bg-primary text-white rounded-xl border border-blue-400 bg-blue-950
            font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2" >
            SOLICITAR APOYO
            </button>
        </div>
        { error && <ErrorMessage message={error}/> }
    </aside>
    )
}

export default Sidebar;

