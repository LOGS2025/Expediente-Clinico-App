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
import HistoriaClinica from "@/components/medical/HistoriaClinica";
import ErrorMessage from "@/components/ui/Error";

const SupervisorDashboardLayout= ()=> {
    const router = useRouter();

    const [ActiveItem, setItem] = useState<ComponentType | null >(null);
    const [appointments, setAppointment] = useState<[Appointment] | null>(null);
    const [option, setOption] = useState<string>('');
    const [showForm, setShowForm] = useState<boolean>(false);
    const videoCallHandler = useVideoCall((state)=>state);
    const [error, setError] = useState<string | null>(null);

    // Get the appointments from supabase
    useEffect(()=>{
        (async () => {
        const appointmentlist = await getAppointmentList();
        if ( appointmentlist ) {
                console.log(appointmentlist)
            setAppointment(appointmentlist);
        }
        })();
    },[])


    function setAppointmentStore(appointment: Appointment) {
        const telemedic = appointment.telemedico;
        const patient = appointment.paciente;
        const supervisor = appointment.supervisor;
        const callId = appointment.callid;

        if ( !telemedic || !patient || !supervisor ) {
            setError("Missing a participant data");
            return;
        }

        videoCallHandler.setParticipants(telemedic.usuario.user_id, patient.usuario.user_id, supervisor.usuario.user_id);

        if ( !callId ) {
            setError("Missing call id!!!");
        }

        videoCallHandler.setCallID(callId);

        console.log(videoCallHandler.getParticipantsUUID());
        console.log(videoCallHandler.getCallId());
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
            <div className="absolute top-[600px] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <AppointmentForm/>
            </div>);

            // case 'hist':
            //     return (
            // <div className="absolute top-[600px] left-1/2 -translate-x-1/2 -translate-y-1/2">
            //     <HistoriaClinica/>
            // </div>
            // )

            case 'config':
            default:
            /* On the same flex, place our db 
            information panel for appointments */
            if ( appointments) { return (
                <div className="absolute top-[600px] left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <AppointmentsPanel appointments={appointments} 
                    onSelectAppointment={setAppointmentStore}/>;
                </div>)
            } else return (<></>);

        }
    }

    return (
        
        <div className="flex flex-row">
            { error ? ( 
                <div>
                    <ErrorMessage message={error}/>                
                </div>
                ) : (
                   <></> 
                )
            }

            {/* Side bar  */}
            <div className="flex-1">
                <Sidebar 
                    ActiveItem={ActiveItem}
                    setItem={setItem}
                    displayHistClin={showForm}
                    setDisplayHistClin={setShowForm}
                />
            </div>

            {/* Adjust to the size of out Navbar */}
            <div className="flex-4 mt-[100px]">
                <div className="flex flex-rowgap-6">
                    <Button onClick={()=>setOption('create')} text="Crear consulta"/>
                    <Button onClick={()=>setOption('config')} text="Configurar consulta"/>
                    <Button onClick={()=>handleJoin()} text="Iniciar consulta"/>
                    <Button onClick={()=>setOption('hist')} text="Historia clinica"/>
                </div>

                {/* Side bar selected item */}
                {ActiveItem?  (<ActiveItem/>) : (<></>)}
            </div>

            {optionDisplay()}
        </div>
    )
}

export default SupervisorDashboardLayout;