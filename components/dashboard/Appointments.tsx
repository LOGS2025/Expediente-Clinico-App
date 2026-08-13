'use client'

import { User } from "@/lib/models/User";
import { Dayjs } from "dayjs";
import { useState } from "react";

export interface Appointment {
  id: string;
  date: Dayjs;
  patient: User;
  assistant: User;
  doctor: User;
  motif: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
}

interface AppointmentsPanelProps {
  appointments: Appointment[];
  onSelectAppointment?: (appointment: Appointment) => void;
  onCancelAppointment?: (appointmentId: string) => void;
  title?: string;
}

const AppointmentsPanel = ({
  appointments = [],
  onSelectAppointment,
  onCancelAppointment,
  title = 'Citas Programadas',
}: AppointmentsPanelProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (appointment: Appointment) => {
    setSelectedId(appointment.id);
    if (onSelectAppointment) {
      onSelectAppointment(appointment);
    }
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'Programada';
      case 'completed':
        return 'Completada';
      case 'cancelled':
        return 'Cancelada';
      case 'in-progress':
        return 'En Progreso';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>

      {appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No hay citas programadas</p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((appointment) => {
            const isSelected = selectedId === appointment.id;
            const statusColor = getStatusColor(appointment.status);
            const statusText = getStatusText(appointment.status);

            return (
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
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {appointment.patient.name}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}>
                        {statusText}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-0.5">
                      <p>
                        <span className="font-medium">Fecha:</span>{' '}
                        {appointment.date.format('DD/MM/YYYY HH:mm')}
                      </p>
                      <p>
                        <span className="font-medium">Doctor:</span>{' '}
                        {appointment.doctor.name}
                      </p>
                      {appointment.assistant && (
                        <p>
                          <span className="font-medium">Asistente:</span>{' '}
                        {appointment.assistant.name}
                        </p>
                      )}
                      <p>
                        <span className="font-medium">Motivo:</span>{' '}
                        {appointment.motif}
                      </p>
                    </div>
                  </div>

                  {onCancelAppointment && appointment.status === 'scheduled' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCancelAppointment(appointment.id);
                      }}
                      className="text-sm text-red-600 hover:text-red-800 hover:underline transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
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
