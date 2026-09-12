'use client';

import { useEffect, useState } from "react";
import AppointmentsPanel from "./appointment/AppointmentPanel";
import AppointmentForm from "./appointment/AppointmentForm";
import { Appointment } from "@/lib/models/Appointment";
import { getAppointmentList } from "@/lib/supabase/appointments";
import { useVideoCall } from "@/lib/hooks/useVideoCall";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/ButtonUniv";
import ErrorMessage from "@/components/ui/Error";
import { useLayout } from "@/providers/LayoutContext";
import { chatpgtSVG } from "@/assets/images";

const Sidebar = ()=> {
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
            case 'create': return <AppointmentForm/>;

            case 'consults': 
            /* On the same flex, place our db 
            information panel for appointments */
            if ( appointments) { 
                return <AppointmentsPanel appointments={appointments} 
                    onSelectAppointment={setAppointmentStore}/>
            };

            default:
                return(<></>)
        }
    }

    return (
    <aside className="text-blue-950 flex flex-col h-full left-0 
    gap-1 p-4 pl-0
    ">
        {/* Display for appointments */}
        <div className="flex flex-col md:items-center md:justify-end w-fit gap-3 mb-10">
            <Button 
            active={option == 'create'}
            onClick={()=>setOption('create')} text="Crear consulta"/>

            <Button 
            active={option == 'consults'}
            onClick={()=>setOption('consults')} text="Ver Consultas"/>

            <Button onClick={()=>{
                if ( appointmentChosen )
                    handleJoin()
                else 
                    setError("Choose an appointment before joining");
                }} text="Iniciar consulta"/>
        </div>

        <div className="flex flex-col w-full items-center justify-center pl-4">
            {optionDisplay()}
        </div>

        <div className="mt-auto p-4">
            <button className="w-full py-3 bg-primary text-white rounded-xl border border-blue-400 bg-blue-950
            font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2" >
            SOLICITAR APOYO
            </button>
        </div>
        { error && <ErrorMessage message={error}/> }
    </aside>
    )
}

export default Sidebar;

//         {/*  Loop for each sidebar item and its attributes */}
//         <nav className="flex flex-col gap-1">
//             {sidebarItems.map((item) => {
//                 return (
//                     <span key={item.name}>
//                         <button 
//                         onClick={()=>{
//                             if ( ActiveItem == item.component ) {
//                                 setItem(()=>null);
//                             } else {
//                                 setItem(()=>item.component); 
//                             }
//                         } }
//                         // w-full p-5 bg-blue-950 py-3 bg-primary text-gray-300 font-light rounded-xl text-xs uppercase tracking-widest 
//                         // gap-2 hover:text-white hover:font-bold transition-all
//                         className="
// h-[100px] p-5 border-b-2
// text-gray-300 font-light text-xs uppercase tracking-widest
// w-full flex flex-row items-center gap-2 
// px-4 py-3 hover:rounded-lg
// transition-all duration-300 ease-in-out
// hover:scale-130 hover:font-bold 
// hover:shadow-lg hover:shadow-xl/30
// hover:bg-blue-950
// focus:outline-none focus:ring-2 focus:ring-blue-400
//                         ">
//           <span className="material-symbols-outlined text-sm">{item.name}</span>
//                         </button>
//                     </span>
//                 )
//             })}

//         <div className="flex flex-col w-full">
//             {/* Main Button - Toggle */}
//             <button 
//             onClick={() => setDisplay(!display)}
//             className="
// w-full p-5 py-3 border-b-2
// text-gray-300 font-light text-xs uppercase tracking-widest
// transition-all duration-300 ease-in-out
// hover:text-white hover:font-bold
//             ">
//             <span>Expediente Clínico</span>
//             </button>

//             {/* Dropdown Menu */}
//             <div 
//             className={`
//                 overflow-hidden transition-all duration-300 ease-in-out
//                 ${display ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}
//             `}
//             >
//                 <div className="flex flex-col gap-8">
//                     {expClinicoItems.map((item) => (
//                     <button
//                         key={item.name}
//                         onClick={() => setItem(()=>item.component)}
//                         className={`w-full p-5 bg-blue-950 rounded-2xl font-light 
//                             text-sm hover:text-white hover:font-bold
//                             `}
//                     >
//                         <span className="">{item.name}</span>
//                     </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//         </nav>