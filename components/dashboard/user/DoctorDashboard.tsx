import Sidebar from "@/components/dashboard/Sidebar";
import { ComponentType, useEffect, useState } from "react";
import AppointmentsPanel from "../appointment/AppointmentPanel";
import AppointmentForm from "../appointment/AppointmentForm";

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

    return (
        <div className="flex ">
            {/* Side bar  */}
            <div className="flex-1">
                <Sidebar 
                    ActiveItem={ActiveItem}
                    setItem={setItem}
                />
            </div>

            <div className="flex-4 self-center mt-52">
                {/* Side bar selected item */}
                {ActiveItem?  (
                    <ActiveItem/>
                ) : (
                    <>
                    </>
                )}
                {/* On the same flex, place our db 
                information panel for appointments */}
                {/* <AppointmentsPanel
                appointments={appointments}
                /> */}
                <AppointmentForm/>
            </div>

            <div>
            </div>
            
        </div>
    )
}

export default DoctorDashboardLayout;
