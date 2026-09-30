'use client';

import { useEffect, useRef, useState } from "react";
import AppointmentsPanel from "./appointment/AppointmentPanel";
import { Appointment } from "@/lib/models/Appointment";
import { getAppointmentList } from "@/lib/supabase/appointments";
import { useVideoCall } from "@/lib/hooks/useVideoCall";
import { useRouter } from "next/navigation";
import ButtonSideBar from "../ui/ButtonSidebar";
import ErrorMessage from "@/components/ui/Error";
import { useLayout } from "@/providers/LayoutContext";
import Link from "next/link";
import AppointmentForm from "./appointment/AppointmentForm";
import { AddPersonSVG, Bild, Calendar, CheckList, Grid, Hat, Home, PeopleSVG, TrashcanSVG } from "@/assets/svg-store";
import { Biblioteca } from "./Biblioteca";
import { Inicio } from "./PapimeMsg";

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

const widthSidebar = 300;

const Sidebar = ()=> {
    const router = useRouter();
    const { setItem } = useLayout();

    const [appointments, setAppointment] = useState<[Appointment] | null>(null);
    const [option, setOption] = useState<string>('inicio');
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

    return (
    <aside className={`
            group
            fixed right-0 top-0
            bg-white
            shadow-2xl
            text-blue-950 font-semibold flex flex-col h-screen
            pt-4 pb-4 pr-0
            transition-all duration-500 ease-in-out
            translate-x-[calc(100%-60px)]
            hover:translate-x-0
      `}
        style={{ width: `${widthSidebar}px` }}
    >
        {/* Display for appointments */}
        <div className="flex flex-col w-fit gap-1 ">
            <ButtonSideBar
            color={colors['Blue']} 
            active={option == 'create'}
            onClick={()=>{
                setItem(()=>Inicio)
                option == 'create' ? setOption('') : setOption('create');
            }} 
            text="Crear consulta"
            Icon={Calendar}
            />
            <ButtonSideBar
            color={colors['Green']}
            active={option == 'consults'}
            onClick={()=>{
                setItem(()=>Inicio)
                option == 'consults' ? setOption('') : setOption('consults');
            }} 
            text="Ver Consultas"
            Icon={AddPersonSVG}
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'cuenta'}
            onClick={()=>{
                setItem(()=>Inicio)
                option == 'cuenta' ? setOption('') : setOption('cuenta');
            }}
            Icon={Bild}
            text="Cuenta"
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'biblioteca'}
            onClick={()=>{
                setItem(()=>Biblioteca);
                option == 'biblioteca' ? setOption('') : setOption('biblioteca');
            }}
            Icon={Grid}
            text="Biblioteca de Recursos"
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'inicio'}
            onClick={()=>{
                setItem(()=>Inicio)
                option == 'inicio' ? setOption('') : setOption('inicio');
            }}
            Icon={Home}
            text="Inicio"
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'comentarios'}
            onClick={()=>{
                setItem(()=>Inicio)
                option == 'comentarios' ? setOption('') : setOption('comentarios');
            }}
            Icon={CheckList}
            text="Comentarios"
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'guiateleconsulta'}
            onClick={()=>{
                setItem(()=>Inicio)
                option == 'guiateleconsulta' ? setOption('') : setOption('guiateleconsulta');
            }}
            Icon={Hat}
            text="Guia de Teleconsulta"
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'PRONAM'}
            onClick={()=>{
                setItem(()=>Inicio)
                option == 'PRONAM' ? setOption('') : setOption('PRONAM');
            }}
            Icon={Hat}
            text="PRONAM y guias clinicas"
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'guiaprescripcion'}
            onClick={()=>{
                setItem(()=>Inicio)
                option == 'guiaprescripcion' ? setOption('') : setOption('guiaprescripcion');
            }}
            Icon={Hat}
            text="Guia de prescripcion"
            />
            <ButtonSideBar
            color={colors['Purple']}
            active={option == 'guiaactProfesionales'}
            onClick={()=>{
                setItem(()=>Inicio)
                option == 'guiaactProfesionales' ? setOption('') : setOption('guiaactProfesionales');
            }}
            Icon={Hat}
            text="Guia de actividades profesionales a confiar"
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'masrecursos'}
            onClick={()=>{
                setItem(()=>Inicio)
                option == 'masrecursos' ? setOption('') : setOption('masrecursos');
            }}
            Icon={Hat}
            text="Mas recursos"
            />
        </div>

        {/* Switch for appointments */}
        <div className="flex flex-col w-full items-center justify-center pl-4">
            {/* {optionDisplay()} */}
        </div>
        { error && <ErrorMessage message={error}/> }
    </aside>
    )
}

export default Sidebar;


            {/* <ButtonSideBar onClick={()=>{
                if ( appointmentChosen )
                    handleJoin()
                else 
                    setError("Choose an appointment before joining");
                }} text="Iniciar consulta"/> */}