'use client';

import { useEffect, useRef, useState } from "react";
import AppointmentsPanel from "./appointment/AppointmentPanel";
import { Appointment } from "@/lib/models/Appointment";
import { getAppointmentList } from "@/lib/supabase/appointments";
import { useVideoCall } from "@/lib/hooks/useVideoCall";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/ButtonUniv";
import ErrorMessage from "@/components/ui/Error";
import { useLayout } from "@/providers/LayoutContext";
import Link from "next/link";
import AppointmentForm from "./appointment/AppointmentForm";
import { AddPersonSVG, PeopleSVG, TrashcanSVG } from "@/assets/svg-store";

type colorTupple = {
    pale : string;
    primary : string;
}

interface Colors {
    [color :string] : colorTupple 
}

const colors : Colors = {
  'Blue': {pale:"#E9F7FF",primary:"#4285FA"},
  'Green': {pale:"#E3FAE3",primary:"#3BD897"},
  'Purple': {pale:"#F3E3FA",primary:"#DE9AF8"}
};

const Sidebar = ()=> {
    const router = useRouter();
    const { ActiveItem } = useLayout();
    const nodeRefAppointmentForm = useRef(null);
    const nodeRefSelectedAppointment = useRef(null);

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
            <AppointmentForm/>
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
    <aside className={`text-blue-950 font-semibold flex flex-col h-full 
    p-4 pl-0 w-fit transition-transform
    `}>
        {/* Display for appointments */}
        <div className="flex flex-col w-fit gap-1 p-4 ">
            <Button
            color={colors['Blue']} 
            active={option == 'create'}
            onClick={()=>{
                option == 'create' ? setOption('') : setOption('create');
                }} text="Crear consulta"
            Icon={AddPersonSVG}
            />
            <Button
            color={colors['Green']}
            active={option == 'consults'}
            onClick={()=>{
                option == 'consults' ? setOption('') : setOption('consults');
                }} text="Ver Consultas"
            Icon={AddPersonSVG}
            />
            <Button
            color={colors['Blue']}
            active={option == 'cuenta'}
            onClick={()=>{}}
            Icon={PeopleSVG}
            text="Cuenta"
            />
            <Button
            color={colors['Blue']}
            active={option == 'biblioteca'}
            onClick={()=>{}}
            Icon={TrashcanSVG}
            text="Biblioteca de Recursos"
            />
            <Button
            color={colors['Blue']}
            active={option == 'cuenta'}
            onClick={()=>{}}
            Icon={PeopleSVG}
            text="Inicio"
            />
            <Button
            color={colors['Blue']}
            active={option == 'cuenta'}
            onClick={()=>{}}
            Icon={AddPersonSVG}
            text="Comentarios"
            />
            <Button
            color={colors['Blue']}
            active={option == 'cuenta'}
            onClick={()=>{}}
            Icon={AddPersonSVG}
            text="Guia de Teleconsulta"
            />
            <Button
            color={colors['Blue']}
            active={option == 'cuenta'}
            onClick={()=>{}}
            Icon={AddPersonSVG}
            text="PRONAM y guias clinicas"
            />
            <Button
            color={colors['Blue']}
            active={option == 'cuenta'}
            onClick={()=>{}}
            Icon={AddPersonSVG}
            text="Guia de prescripcion"
            />
            <Button
            color={colors['Blue']}
            active={option == 'cuenta'}
            onClick={()=>{}}
            Icon={AddPersonSVG}
            text="Guia de actividades profesionales a confiar"
            />
            <Button
            color={colors['Blue']}
            active={option == 'cuenta'}
            onClick={()=>{}}
            Icon={AddPersonSVG}
            text="Mas recursos"
            />
        </div>

        {/* Switch for appointments */}
        <div className="flex flex-col w-full items-center justify-center pl-4">
            {/* {optionDisplay()} */}
        </div>

        <div className="mt-auto p-4">
            {/* 
                Link to ...
            */}
            <Link className="
                w-full py-3 bg-primary text-white rounded-xl border border-blue-400 bg-blue-950
                font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2
                hover:scale-90 hover:text-blue-300
            "
            href={'www.google.com'}>
            SOLICITAR APOYO
            </Link>
        </div>
        { error && <ErrorMessage message={error}/> }
    </aside>
    )
}

export default Sidebar;


            {/* <Button onClick={()=>{
                if ( appointmentChosen )
                    handleJoin()
                else 
                    setError("Choose an appointment before joining");
                }} text="Iniciar consulta"/> */}