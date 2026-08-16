import Sidebar from "@/components/dashboard/Sidebar";
import { ComponentType, useEffect, useState } from "react";
import AppointmentsPanel from "../appointment/AppointmentPanel";
import AppointmentForm from "../appointment/AppointmentForm";
import { Appointment } from "@/lib/models/Appointment";
import { getAppointmentList } from "@/lib/supabase/appointments";
import { useVideoCall } from "@/lib/hooks/useVideoCall";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

    const [ActiveItem, setItem] = useState<ComponentType | null >(null);
    const [appointments, setAppointment] = useState<[Appointment] | null>(null);
    const [option, setOption] = useState<string>('');
    const setupVideoParticipantsUUID = useVideoCall((state)=>state.setParticipants);
    const getVideoParticipantsUUID = useVideoCall((state)=>state.getParticipantsUUID);

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

    function setAppointmentStore(appointment: Appointment) {
        const doctor = appointment.doctor;
        const patient = appointment.paciente;
        const supervisor = appointment.supervisor;
        const list = [doctor, patient, supervisor? supervisor : ''];

        setupVideoParticipantsUUID(list);
    }
   
    const handleJoin = () => {
    try {
        console.log("Pressed")
        const data = getVideoParticipantsUUID();
        console.log(data);
        // We create a call ID
        const callID = '001'
        router.push(`/meeting/${callID}`);

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
                    <Button onClick={()=>setOption('create')} text="Crear cita"/>
                    <Button onClick={()=>setOption('config')} text="Configurar cita"/>
                    <Button onClick={()=>handleJoin()} text="Iniciar cita"/>
                </div>

                {/* Side bar selected item */}
                {ActiveItem?  (<ActiveItem/>) : (<></>)}
            </div>

            {optionDisplay()}
        </div>
    )
}

export default DoctorDashboardLayout;


const Button = ({text, onClick}:{text: string; onClick?: ()=>void;})=>{
    return (
        <div className="flex items-center justify-center p-8">
        <button onClick={onClick} className="group relative px-8 py-4 bg-slate-800 rounded-xl font-bold text-white overflow-hidden transform transition-all duration-300 hover:scale-110">
                <span className="relative z-10">{text}</span>
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-emerald-500 transition-all duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
        </div>
    )
}