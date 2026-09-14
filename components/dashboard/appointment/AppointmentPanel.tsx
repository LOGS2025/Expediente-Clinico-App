// components/appointments/AppointmentsPanel.tsx
'use client';

import { PersonIcon } from "@/assets/images";
import { Appointment } from "@/lib/models/Appointment";
import Image from "next/image";
import { useState } from "react";
import Draggable from "react-draggable";

interface AppointmentsPanelProps {
  appointments: Appointment[];
  onSelectAppointment?: (appointment: Appointment) => void;
  onCancelAppointment?: (appointmentId: number) => void;
  title?: string;
}

const AppointmentsPanel = ({
  appointments,
  onSelectAppointment,
  onCancelAppointment,
  title = 'Consultas',
}: AppointmentsPanelProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (appointment: Appointment) => {
    setSelectedId(selectedId === appointment.id ? null : appointment.id);
    if (onSelectAppointment && selectedId !== appointment.id) {
      onSelectAppointment(appointment);
    }
  };

  return (
    <div className="text-gray-500 text-sm h-full w-full
     overflow-y-auto">

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
          onClick={() => handleSelect(appointment)}
          className={`w-full text-left py-2 transition-all duration-150
            ${isSelected ? 'bg-gray-300 px-2.5' : ''}`}
        >
          <span>Consulta {appointment.id}</span>

          <div className="flex flex-row items-center mt-1">
            {[appointment.paciente, appointment.telemedico, appointment.supervisor].map((p, i) => {
              const url = p?.usuario?.photoURL;
              return (
                <div
                  key={i}
                  className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 -ml-2 first:ml-0"
                >
                  <Image
                    src={url || PersonIcon}
                    alt=""
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        </button>
      );
    })}
    </div>
      )}
    </div>
  );
};

export default AppointmentsPanel;
