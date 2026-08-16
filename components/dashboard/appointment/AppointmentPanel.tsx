'use client'

import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { AppointmentSlice } from "@/lib/models/Appointment";
import { User } from "@/lib/models/User";
import { Role } from "@/lib/utils/types";
import { Dayjs } from "dayjs";
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();
  const login = useBoundStore((state)=>state.login);

  const handleSelect = (appointment: AppointmentSlice) => {
    setSelectedId(appointment.id);
    if (onSelectAppointment) {
      onSelectAppointment(appointment);
    }
  };

  const handleJoin = async () => {
    try {
        router.push(`/meeting/${appointment.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="flex flex-nowrap">
        <button className="flex-1 border rounded-3xl p-4">
          Crear Cita</button>
        <button className="flex-1 border rounded-3xl p-4">
          Configurar Agenda</button>
      </div>

      <h2 className="text-lg font-semibold text-amber-100 mb-4 pt-5">{title}</h2>

      {appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No hay citas</p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((appointment) => {
            const isSelected = selectedId === appointment.id;
            return (
            <div>
              <div
                key={appointment.id}
                onClick={() => handleSelect(appointment)}
                className={`
                  border rounded-lg p-4 cursor-pointer transition-all
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-50 shadow-sm' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }
                `}
              >
                <span>
                {appointment.date.format('DD/MM/YYYY HH:mm')}</span>
                <span>
                {appointment.doctor_uuid}</span>
                <span>
                {appointment.supervisor_uuid}</span>
                <span>
                {appointment.motif}</span>
              </div>


              <div>
                <button onClick={()=>handleJoin()} className="border p-4">
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
