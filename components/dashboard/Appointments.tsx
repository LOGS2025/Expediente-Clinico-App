'use client'

import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { User } from "@/lib/models/User";
import { Role } from "@/lib/utils/types";
import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const doctData : User =  {
    id_string: '0110917152',
    email: 'doc@gmail.com',
    name: 'pepe toro',
    phone: '0000000000',
    role: 'doctor',
}
const supData : User = {
    id_string: '0110917152',
    email: 'sup@gmail.com',
    name: 'juanito gonzalez',
    phone: '0000000000',
    role: 'supervisor',
}
const patientData : User= {
    id_string: '0110917152',
    email: 'patient@gmail.com',
    name: 'diego mercante',
    phone: '0000000000',
    role: 'patient',
}

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

const AppointmentsPanel = ({  appointments = [], onSelectAppointment,
                              onCancelAppointment, title = 'Citas Programadas', }: 
AppointmentsPanelProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();
  const login = useBoundStore((state)=>state.login);

  const handleSelect = (appointment: Appointment) => {
    setSelectedId(appointment.id);
    if (onSelectAppointment) {
      onSelectAppointment(appointment);
    }
  };

  const handleJoin = async (role : Role) => {
    try {
      switch (role) {
        case 'doctor': await login(doctData)
          router.push('/meeting/0110');
          break;
        case 'supervisor': await login(supData)
          router.push('/meeting/0110');
          break;
        case 'patient': await login(patientData)
          router.push('/meeting/0110');
          break;
        default: await login(patientData)
          router.push('/meeting/0110');
          break;
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="flex flex-nowrap">
        <button 
        className="flex-1 border rounded-3xl p-4">Crear Cita</button>
        <button className="flex-1 border rounded-3xl p-4">Configurar Agenda</button>
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
                {appointment.doctor.name}</span>
                <span>
                {appointment.assistant.name}</span>
                <span>
                {appointment.motif}</span>
              </div>


              <div>
                <button onClick={()=>{
                    handleJoin('patient');
                }} className="border p-4">
                  Join Videocall as Patient</button>
                <button onClick={()=>{
                    handleJoin('doctor');
                }} className="border p-4">
                  Join Videocall as Doctor</button>
                <button onClick={()=>{
                    handleJoin('supervisor');
                }} className="border p-4">
                  Join Videocall as Supervisor</button>
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
