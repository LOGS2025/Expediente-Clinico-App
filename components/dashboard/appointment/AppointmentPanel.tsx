// components/appointments/AppointmentsPanel.tsx
'use client';

import { PersonIcon } from "@/assets/images";
import { Appointment } from "@/lib/models/Appointment";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    console.log(appointments);
  }, [appointments]);

  // Helper to render full name
  const getFullName = (p: any) => {
    if (!p?.usuario) return 'Sin asignar';
    return `${p.usuario.nombre} ${p.usuario.apellido_p} ${p.usuario.apellido_m}`;
  };

  return (
    <div className="text-gray-500 text-sm h-full w-full overflow-y-auto">

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