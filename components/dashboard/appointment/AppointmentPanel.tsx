'use client'

import { Appointment } from "@/lib/models/Appointment";
import dayjs from "dayjs";
import { useState } from "react";


interface AppointmentsPanelProps {
  appointments: [Appointment];
  onSelectAppointment?: (appointment: Appointment) => void;
  onCancelAppointment?: (appointmentId: string) => void;
  title?: string;
}

function getDateFormatted(s:string) {
  const date = dayjs(s);
  const formatted3 = date.format('MMM DD, YYYY --- HH:mm');

  return formatted3;
}

const AppointmentsPanel = ({  appointments, onSelectAppointment,
                              onCancelAppointment, title = 'Citas Programadas', }: 
AppointmentsPanelProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (appointment: Appointment) => {
    setSelectedId(appointment.id);
    if (onSelectAppointment) {
      onSelectAppointment(appointment);
    }
  };

  return (
    <div className="text-gray-600 h-[500] w-[500] overflow-y-auto">
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
          className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
        >
          <label className="flex items-center justify-between p-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <span className="text-lg font-semibold">Cita {appointment.id}, {getDateFormatted(appointment.fecha)}</span>
            <svg 
              className={`w-6 h-6 transition-transform duration-300 ${selectedId === appointment.id ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </label>
          
          <div 
            className={`overflow-hidden transition-all duration-300 ${
              selectedId === appointment.id ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-col p-4">
              <span>Fecha : {getDateFormatted(appointment.fecha)}</span>
              {/* <span>Fecha de creacion : {appointment.creacion}</span> */}
              <span>Motivo : {appointment.motif}</span>
              <span>id : {appointment.id}</span>
              <label htmlFor="text">Doctor :</label>
              <ParticipantInfo participant={appointment.doctor}/>
              <label htmlFor="text">Paciente :</label>
              <ParticipantInfo participant={appointment.paciente}/>
              {appointment.supervisor && (
                <>
                  <label htmlFor="text">Supervisor :</label>
                  <ParticipantInfo participant={appointment.supervisor}/>
                </>
              )}
            </div>
          </div>
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


// flex flex-col border rounded-lg p-4 cursor-pointer transition-all
//             ${isSelected 
//               ? 'border-blue-500 bg-blue-50 shadow-sm' 
//               : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
//             }