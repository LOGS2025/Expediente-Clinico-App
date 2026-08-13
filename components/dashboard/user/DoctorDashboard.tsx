import Sidebar from "@/components/dashboard/Sidebar";
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { ComponentType, useState } from "react";
import AppointmentsPanel from "../Appointments";
import dayjs from "dayjs";
import { User } from "@/lib/models/User";


const patient1 : User = {
    id_string:'P001', 
    email:'maria.gonzalez@email.com', 
    name:'María González',
    role:'patient'
};
const patient2 : User = {
    id_string:'P002', 
    email:'carlos.perez@email.com', 
    name:'Carlos Pérez',
    role:'patient'
};
const doctor1 : User = {
    id_string:'D001', 
    email:'elena.rodriguez@email.com', 
    name:'Dr. Elena Rodriguez',
    role:'doctor'
};
const doctor2 : User = {
    id_string:'D002', 
    email:'javier.martinez@email.com', 
    name:'Dr. Javier Martinez',
    role:'doctor'
};
const supervisor1 : User = {
    id_string:'S001', 
    email:'ana.torres@email.com', 
    name:'Lic. Ana Torres.',
    role:'supervisor'
};

/*
Dashboard 
    funcion :
        Iniciar videocall
        Crear cita
    componentes :
        Calendario
        Citas dashboard
*/

const appointments = [
    {
      id: '1',
      date: dayjs().add(2, 'days').hour(10).minute(0),
      patient: patient1,
      doctor: doctor1,
      assistant: supervisor1,
      motif: 'Consulta de seguimientopatient cardiovascular',
      status: 'scheduled' as const,
    },
    {
      id: '2',
      date: dayjs().add(3, 'days').hour(14).minute(30),
      patient: patient2,
      doctor: doctor2,
      assistant: supervisor1,
      motif: 'Evaluación neurológica',
      status: 'scheduled' as const,
    },
    {
      id: '3',
      date: dayjs().subtract(1, 'day').hour(9).minute(0),
      patient: patient1,
      doctor: doctor1,
      assistant: supervisor1,
      motif: 'Revisión de estudios',
      status: 'completed' as const,
    },
];

const DoctorDashboardLayout = ()=> {
    const [ActiveItem, setItem] = useState<ComponentType | null >(null);
    const user = useBoundStore((state)=>state.user);

    return (
        <div className="flex ">
            {/* Side bar  */}
            <div className="flex-1">
                <Sidebar 
                    ActiveItem={ActiveItem}
                    setItem={setItem}
                />
            </div>

            <div className="flex-4">
                {/* Side bar selected item */}
                {ActiveItem?  (
                    <ActiveItem/>
                ) : (
                    <>
                    </>
                )}
                {/* On the same flex, place our db 
                information panel for appointments */}
                <AppointmentsPanel
                appointments={appointments}
                />
            
            </div>
            
        </div>
    )
}

export default DoctorDashboardLayout;
