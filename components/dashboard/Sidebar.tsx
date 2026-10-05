'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonSideBar from "../ui/ButtonSidebar";
import ErrorMessage from "@/components/ui/Error";
import { useLayout } from "@/providers/LayoutContext";
import { AddPersonSVG, Bild, Calendar, CheckList, Grid, Hat, Home, PeopleSVG, TrashcanSVG } from "@/assets/svg-store";
import { Biblioteca } from "../sidebarItems/Biblioteca";
import { Inicio } from "./PapimeMsg";
import AppointmentForm from "../sidebarItems/appointment/AppointmentForm";
import AppointmentsPanel from "../sidebarItems/appointment/AppointmentPanel";
import { Management } from "../sidebarItems/Management";

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

    const [error, setError] = useState<string | null>(null);
    const [option, setOption] = useState<string>('inicio');

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
        <div className="flex flex-col w-fit gap-1 ">
            <ButtonSideBar
            color={colors['Blue']} 
            active={option == 'create'}
            onClick={()=>{
                setItem(()=>AppointmentForm)
                option == 'create' ? setOption('') : setOption('create');
            }} 
            text="Crear consulta"
            Icon={AddPersonSVG}
            />
            <ButtonSideBar
            color={colors['Green']}
            active={option == 'consults'}
            onClick={()=>{
                setItem(()=>AppointmentsPanel)
                option == 'consults' ? setOption('') : setOption('consults');
            }} 
            text="Ver Consultas"
            Icon={Calendar}
            />
            <ButtonSideBar
            color={colors['Purple']}
            active={option == 'permisos'}
            onClick={()=>{
                setItem(()=>Management)
                option == 'permisos' ? setOption('') : setOption('permisos');
            }} 
            text="Permisos"
            Icon={PeopleSVG}
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