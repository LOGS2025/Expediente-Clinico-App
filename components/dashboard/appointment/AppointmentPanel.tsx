// components/appointments/AppointmentsPanel.tsx
'use client';

import { Appointment } from "@/lib/models/Appointment";
import { Participant } from "@/lib/models/User";
import { useState } from "react";

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
    <div className="text-gray-600 h-[500px] w-full overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 pt-5 sticky top-0 bg-white z-10">
        {title}
      </h2>

      {appointments.length < 1 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No hay consultas</p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((appointment) => {
            const isSelected = selectedId === appointment.id;
            return (
              <div key={appointment.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header - Clickable */}
                <div
                  onClick={() => handleSelect(appointment)}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold">
                      Consulta #{appointment.id}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      appointment.pending
                        ? 'bg-yellow-400/20 text-yellow-200' 
                        : 'bg-green-400/20 text-green-200'
                    }`}>
                      {appointment.pending ? 'Pendiente' : 'Completada'}
                    </span>
                  </div>
                  <svg
                    className={`w-6 h-6 transition-transform duration-300 ${
                      isSelected ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Content - Expandable */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isSelected ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4">
                    {/* Split Participants View */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Telemedico Card */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-sm">
                              medical_services
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                            Telemedico
                          </span>
                        </div>
                        <ParticipantInfo participant={appointment.telemedico} role="telemedico" />
                      </div>

                      {/* Paciente Card */}
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-sm">
                              person
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                            Paciente
                          </span>
                        </div>
                        <ParticipantInfo participant={appointment.paciente} role="paciente" />
                      </div>
                    </div>

                    {/* Optional: Supervisor info */}
                    {appointment.supervisor && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="material-symbols-outlined text-sm">supervisor_account</span>
                          <span className="font-medium">Supervisor:</span>
                          <span>
                            {appointment.supervisor.usuario.nombre} {appointment.supervisor.usuario.apellido_p}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => {
                          // Join call logic
                          console.log('Joining call:', appointment.callid);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">videocam</span>
                        Unirse
                      </button>
                      {appointment.pending && onCancelAppointment && (
                        <button
                          onClick={() => onCancelAppointment(appointment.id)}
                          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                          Cancelar
                        </button>
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

// Participant Info Component with Avatar
const ParticipantInfo = ({
  participant,
  role,
}: {
  participant: Participant;
  role?: 'telemedico' | 'paciente';
}) => {
  if (!participant || !participant.usuario) {
    return <span className="text-gray-400 text-sm">No disponible</span>;
  }

  const { nombre, apellido_p, apellido_m, uuid } = participant.usuario;

  // Color scheme based on role
  const colors = {
    telemedico: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      icon: '',
    },
    paciente: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      icon: '',
    }
  };

  const color = role ? colors[role] : colors.paciente;

  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full ${color.bg} border ${color.border} flex items-center justify-center flex-shrink-0`}>
      </div>
      <div>
        <p className="font-medium text-gray-800">
          {nombre} {apellido_p} {apellido_m}
        </p>
        <p className="text-xs text-gray-400">ID: {uuid?.substring(0, 8)}...</p>
      </div>
    </div>
  );
};