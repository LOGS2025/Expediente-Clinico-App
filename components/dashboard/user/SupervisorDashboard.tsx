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


const callId = 'demo-call-y276HhfW';

const SupervisorDashboardLayout= ()=> {
    const router = useRouter();

    const [ActiveItem, setItem] = useState<ComponentType | null >(null);
    const [appointments, setAppointment] = useState<[Appointment] | null>(null);
    const [option, setOption] = useState<string>('');
    const [showForm, setShowForm] = useState<boolean>(false);
    const setupVideoParticipantsUUID = useVideoCall((state)=>state.setParticipants);
    const getVideoParticipantsUUID = useVideoCall((state)=>state.getParticipantsUUID);

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
        const telemedic = appointment.telemedic;
        const patient = appointment.paciente;
        const supervisor = appointment.supervisor;

        setupVideoParticipantsUUID(telemedic.user_id, patient.user_id, supervisor.user_id);
    }
   
    const handleJoin = () => {
        try {
            const data = getVideoParticipantsUUID();
            // We create a call ID
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
                    {/* <AppointmentsPanel appointments={appointments} 
                    onSelectAppointment={setAppointmentStore}/>; */}
                </div>)
            } else return (<></>);

        }
    }

    return (
        <div className="flex flex-row">
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