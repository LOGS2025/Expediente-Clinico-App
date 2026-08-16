import Sidebar from "@/components/dashboard/Sidebar";
import { ComponentType, useEffect, useState } from "react";
import AppointmentsPanel from "../appointment/AppointmentPanel";
import AppointmentForm from "../appointment/AppointmentForm";
import { AppointmentSlice } from "@/lib/models/Appointment";
import { createAppointment, getAppointmentList } from "@/lib/supabase/appointments";

/*
Dashboard 
    funcion :
        Iniciar videocall
        Crear cita
    componentes :
        Calendario
        Citas dashboard
*/
const DoctorDashboardLayout = ()=> {
    const [ActiveItem, setItem] = useState<ComponentType | null >(null);
    const [appointments, setAppointment] = useState<[AppointmentSlice] | null>(null);
    const [option, setOption] = useState<string>(''); 

    // Get the appointments from supabase
    useEffect(()=>{
        (async () => {
        const appointmentlist = await getAppointmentList();
        if ( appointmentlist ) {
            setAppointment(appointmentlist);
            console.log(appointmentlist)
        }
        })();
    },[])

    function optionDisplay() {
        switch (option) {
            case 'create': return (
            <div className="absolute top-[600px] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <AppointmentForm/>
            </div>);

            case 'config':
            default:
            /* On the same flex, place our db 
            information panel for appointments */
            if ( appointments) { return (
                <AppointmentsPanel appointments={appointments}/>);
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
                />
            </div>

            {/* Adjust to the size of out Navbar */}
            <div className="flex-4 mt-[100px]">
                <div className="flex flex-rowgap-6">
                    <button className="bg-gray-500 text-blue-200 pt-3 pb-3 pl-1 pr-1 rounded-2xl m-1.5" 
                    onClick={()=>setOption('create')}>Crear Cita</button>
                    <button className="bg-gray-500 text-blue-200 pt-3 pb-3 pl-1 pr-1 rounded-2xl m-1.5" 
                    onClick={()=>setOption('config')}>Configurar Cita</button>
                </div>

                {/* Side bar selected item */}
                {ActiveItem?  (<ActiveItem/>) : (<></>)}
            </div>

            {optionDisplay()}
        </div>
    )
}

export default DoctorDashboardLayout;
