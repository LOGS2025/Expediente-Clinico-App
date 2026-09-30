'use client';

import { useEffect, useRef, useState } from "react";
import useMouse from "@react-hook/mouse-position";
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
    const [inFocus, setInFocus] = useState<Boolean>(false);
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
    <aside className={`
            group
            fixed right-0 top-0 z-40
            bg-white
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
                option == 'create' ? setOption('') : setOption('create');
            }} 
            text="Crear consulta"
            Icon={Calendar}
            />
            <ButtonSideBar
            color={colors['Green']}
            active={option == 'consults'}
            onClick={()=>{
                option == 'consults' ? setOption('') : setOption('consults');
            }} 
            text="Ver Consultas"
            Icon={AddPersonSVG}
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'cuenta'}
            onClick={()=>{
                option == 'cuenta' ? setOption('') : setOption('cuenta');
            }}
            Icon={Bild}
            text="Cuenta"
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'biblioteca'}
            onClick={()=>{
                option == 'biblioteca' ? setOption('') : setOption('biblioteca');
            }}
            Icon={Grid}
            text="Biblioteca de Recursos"
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'inicio'}
            onClick={()=>{
                option == 'inicio' ? setOption('') : setOption('inicio');
            }}
            Icon={Home}
            text="Inicio"
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'comentarios'}
            onClick={()=>{
                option == 'comentarios' ? setOption('') : setOption('comentarios');
            }}
            Icon={CheckList}
            text="Comentarios"
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'guiateleconsulta'}
            onClick={()=>{
                option == 'guiateleconsulta' ? setOption('') : setOption('guiateleconsulta');
            }}
            Icon={Hat}
            text="Guia de Teleconsulta"
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'PRONAM'}
            onClick={()=>{
                option == 'PRONAM' ? setOption('') : setOption('PRONAM');
            }}
            Icon={Hat}
            text="PRONAM y guias clinicas"
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'guiaprescripcion'}
            onClick={()=>{
                option == 'guiaprescripcion' ? setOption('') : setOption('guiaprescripcion');
            }}
            Icon={Hat}
            text="Guia de prescripcion"
            />
            <ButtonSideBar
            color={colors['Purple']}
            active={option == 'guiaactProfesionales'}
            onClick={()=>{
                option == 'guiaactProfesionales' ? setOption('') : setOption('guiaactProfesionales');
            }}
            Icon={Hat}
            text="Guia de actividades profesionales a confiar"
            />
            <ButtonSideBar
            color={colors['Blue']}
            active={option == 'masrecursos'}
            onClick={()=>{
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


            {/* <ButtonSideBar onClick={()=>{
                if ( appointmentChosen )
                    handleJoin()
                else 
                    setError("Choose an appointment before joining");
                }} text="Iniciar consulta"/> */}