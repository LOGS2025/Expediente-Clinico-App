// components/appointments/AppointmentsPanel.tsx
'use client';

import { PersonIcon } from "@/assets/images";
import { Appointment } from "@/lib/models/Appointment";
import { getAppointmentList } from "@/lib/supabase/appointments";
import { useEffect, useState } from "react";
import { useVideoCall } from "@/lib/hooks/useVideoCall";
import { useRouter } from "next/navigation";
import { LoaderCloud } from "@/components/ui/LoaderCloud";


const AppointmentsPanel = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

    const videoCallHandler = useVideoCall((state)=>state);
  // Fetches all appointments from supabase
    const [appointments, setAppointmentList] = useState<[Appointment] | null>(null);
  // Sets true so videocall meeting can be read.
    const [appointmentChosen, setAppointmentChosen] = useState<boolean>(false);
  // Chooses a given apppointment
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    // Get the appointments from supabase
    useEffect(()=>{
        (async () => {
          const appointmentlist = await getAppointmentList();
          if ( appointmentlist ) {
              setAppointmentList(appointmentlist);
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

  // Helper to render full name
  const getFullName = (p: any) => {
    if (!p?.usuario) return 'Sin asignar';
    return `${p.usuario.nombre} ${p.usuario.apellido_p} ${p.usuario.apellido_m}`;
  };

  if ( !appointments ) {
    return (
      <div className="">
        <LoaderCloud/>
      </div>
    )
  } 
  return (
    <div className="text-gray-500 text-sm min-h-[500px] w-full overflow-y-auto">

      {appointments.length < 1 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No hay consultas</p>
        </div>
      ) : (
        <div className="space-y-2">
          {appointments.map((appointment) => {
            const isSelected = selectedId === appointment.id;
            const { paciente, telemedico, supervisor } = appointment;

            return (
              <button
                key={appointment.id}
                onClick={() =>{setSelectedId(appointment.id)}}
                className={`
                  pl-4 rounded-3xl
                  shadow-[inset_0_5px_4px_rgba(0,0,0,0.08),inset_0_-1px_0_rgba(140,140,140.8)]
                  w-full text-left py-2 transition-all duration-150
                  hover:bg-blue-200 hover:px-2.5
                  ${isSelected ? 'bg-[] px-2.5' : ''}
                `}
              >
                <span>Consulta {appointment.id}</span>

                {/* Avatar stack (visible only for non-selected appointments) */}
                <div className="flex flex-row items-center mt-1">
                  {[paciente, telemedico, supervisor].map((p, i) => {
                    const url = p?.usuario?.photourl;
                    return (
                      !isSelected && <div
                        key={i}
                        className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 -ml-2 first:ml-0"
                      >
                        <img
                          src={url || PersonIcon}
                          alt=""
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Expanded details when selected */}
                {isSelected && (
                  <div className="mt-3 space-y-2">
                    {/* Patient */}
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex flex-col">
                      {/* Start of photourl circle */}
                     <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                        <img
                          src={paciente?.usuario?.photourl || PersonIcon}
                          alt=""
                          className="object-cover"
                        />
                      </div>
                      {/* End of photourl circle */}
                      <span>Paciente:</span>
                      </div>
                      <span>{getFullName(paciente)}</span>
                    </div>

                    {/* Telemedic */}
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex flex-col">
                        {/* Start of photourl circle */}
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                          <img
                            src={telemedico?.usuario?.photourl || PersonIcon}
                            alt=""
                            className="object-cover"
                          />
                        </div>
                        {/* End of photourl circle */}
                        <span>Telemedico:</span>
                     </div>
                      <span>{getFullName(telemedico)}</span>
                    </div>

                    {/* Supervisor */}
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex flex-col">
                        {/* Start of photourl circle */}
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                          <img
                            src={supervisor?.usuario?.photourl || PersonIcon}
                            alt=""
                            className="object-cover"
                          />
                        </div>
                        {/* End of photourl circle */}
                        <span>Supervisor:</span>
                     </div>
                      <span>{getFullName(supervisor)}</span>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppointmentsPanel;