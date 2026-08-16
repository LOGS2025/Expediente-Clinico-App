'use client'

import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { AppointmentSlice } from "@/lib/models/Appointment";
import { User } from "@/lib/models/User";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface AppointmentsPanelProps {
  appointments: [AppointmentSlice];
  onSelectAppointment?: (appointment: AppointmentSlice) => void;
  onCancelAppointment?: (appointmentId: string) => void;
  title?: string;
}

const AppointmentsPanel = ({  appointments, onSelectAppointment,
                              onCancelAppointment, title = 'Citas Programadas', }: 
AppointmentsPanelProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const router = useRouter();

  const handleSelect = (appointment: AppointmentSlice) => {
    setSelectedId(appointment.id);
    if (onSelectAppointment) {
      onSelectAppointment(appointment);
    }
  };

  const handleJoin = async ( appointment : AppointmentSlice) => {
    try {
        router.push(`/meeting/${appointment.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-blue-50 text-gray-600 h-[500] w-[500] overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 pt-5">{title}</h2>

      {appointments.length < 1 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No hay citas</p>
        </div>
      ) : (
    <div className="space-y-3">
      {appointments.map((appointment) => {
        const isSelected = selectedId === appointment.id;
        return (
      <div key={appointment.id}>
        <div
          onClick={() => handleSelect(appointment)}
          className={`
            flex flex-col border rounded-lg p-4 cursor-pointer transition-all
            ${isSelected 
              ? 'border-blue-500 bg-blue-50 shadow-sm' 
              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }
          `}
        >
          <span>Fecha : {appointment.fecha}</span>
          <span>Fecha de creacion : {appointment.creacion}</span>
          <span>Motivo : {appointment.motif}</span>
          <span>id : {appointment.id}</span>
          <label htmlFor="text">Doctor :</label>
          <ParticipantInfo participant={appointment.doctor}/>
          <label htmlFor="text">Paciente :</label>
          <ParticipantInfo participant={appointment.paciente}/>
          { appointment.supervisor ? (
            <>
              <label htmlFor="text">Supervisor :</label>
              <ParticipantInfo participant={appointment.supervisor}/>
            </>
          ) : (<></>)}
        </div>

        <div>
          <button onClick={()=>handleJoin(appointment)} className="border p-4">
            Join Videocall</button>
        </div>
      </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppointmentsPanel;


const ParticipantInfo = ( {participant}:{participant : any} )=> {
  return (
    <>
      <span>{participant.nombre} {participant.apellido_p} {participant.apellido_m}</span>
      <span>{participant.user_id}</span>
    </>
  )
}