// components/appointments/AppointmentsPanel.tsx
'use client';

import { PersonIcon } from "@/assets/images";
import { Appointment } from "@/lib/models/Appointment";
import { getAppointmentList } from "@/lib/supabase/appointments";
import { useEffect, useState } from "react";
import { useVideoCall } from "@/lib/hooks/useVideoCall";
import { useRouter } from "next/navigation";
import { LoaderCloud } from "@/components/ui/LoaderCloud";
import ErrorMessage from "@/components/ui/Error";

const AppointmentsPanel = () => {
  const videoCallHandler = useVideoCall((state) => state);

  const [appointments, setAppointmentList] = useState<[Appointment] | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [appointmentChosen, setAppointmentChosen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // ✅ Fetch all appointments
  useEffect(() => {
    (async () => {
      const appointmentlist = await getAppointmentList();
      if (appointmentlist) {
        setAppointmentList(appointmentlist);
      }
    })();
  }, []);

  // ✅ Store the selected appointment into the video-call store
  function setAppointmentStore(appointment: Appointment) {
    const telemedic_uuid = appointment.telemedico.usuario.uuid;
    const patient_uuid = appointment.paciente.usuario.uuid;
    const supervisor_uuid = appointment.supervisor.usuario.uuid;
    const callId = appointment.callid;

    if (!telemedic_uuid || !patient_uuid || !supervisor_uuid) {
      setError("Missing a participant data");
      return;
    }

    videoCallHandler.setParticipants(telemedic_uuid, patient_uuid, supervisor_uuid);

    if (!callId) {
      setError("Missing call id!!!");
      return;
    }

    setAppointmentChosen(true);
    videoCallHandler.setCallID(callId);
  }

  const handleJoin = () => {
    try {
      const callId = videoCallHandler.getCallId();
      router.push(`/meeting/${callId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getFullName = (p: any) => {
    if (!p?.usuario) return 'Sin asignar';
    return `${p.usuario.nombre} ${p.usuario.apellido_p} ${p.usuario.apellido_m ?? ''}`;
  };

  if (!appointments) {
    return (
      <div className="">
        <LoaderCloud />
      </div>
    );
  }

  const selectedAppointment = appointments.find((a) => a.id === selectedId);

  return (
    <div className="flex flex-row w-full gap-4 p-2 min-h-[500px]">

      {/* ───── LEFT COLUMN — Appointment list ───── */}
      <div className="flex flex-col gap-2 w-1/2 overflow-y-auto">
        <h3 className="font-bold text-sm text-[#002E6D] mb-1">
          Consultas
        </h3>

        {appointments.length < 1 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No hay consultas</p>
          </div>
        ) : (
          appointments.map((appointment) => {
            const isSelected = selectedId === appointment.id;
            const { paciente, telemedico, supervisor } = appointment;

            return (
              <button
                key={appointment.id}
                onClick={() => {
                  const next = isSelected ? null : appointment.id;
                  setSelectedId(next);
                  if (next !== null) setAppointmentStore(appointment);
                }}
                className={`
                  flex flex-row items-center justify-between gap-3
                  p-3 
                  border text-left
                  shadow-2xl
                  transition-all duration-200
                  ${isSelected
                    ? 'border-[#002E6D] bg-[#F0F4F8]'
                    : 'border-slate-200 bg-white hover:bg-[#F0F4F8]'
                  }
                `}
              >
                {/* Left — avatar stack */}
                <div className="flex flex-row items-center">
                  {[paciente, telemedico, supervisor].map((p, i) => {
                    const url = p?.usuario?.photourl;
                    return (
                      <img
                        key={i}
                        src={url || PersonIcon}
                        alt=""
                        className="
                          w-10 h-10 object-cover shrink-0
                          bg-slate-200
                          -ml-3 first:ml-0
                          ring-2 ring-white
                        "
                      />
                    );
                  })}
                </div>

                {/* Right — label */}
                <span className="font-medium text-[#002E6D] truncate">
                  Consulta {appointment.id}
                </span>
              </button>
            );
          })
        )}
      </div>

      {/* ───── RIGHT COLUMN — Selected appointment details ───── */}
      <div className="flex flex-col gap-3 w-1/2">
        <h3 className="font-bold text-sm text-[#002E6D] mb-1">
          Detalles
        </h3>

        {!selectedAppointment ? (
          <div className="flex items-center justify-center h-full text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-2xl">
            Selecciona una consulta
          </div>
        ) : (
          <div className="flex flex-col gap-3">

            {/* Patient */}
            <ParticipantRow
              label="Paciente"
              person={selectedAppointment.paciente}
              getFullName={getFullName}
            />

            {/* Telemedic */}
            <ParticipantRow
              label="Telemédico"
              person={selectedAppointment.telemedico}
              getFullName={getFullName}
            />

            {/* Supervisor */}
            <ParticipantRow
              label="Supervisor"
              person={selectedAppointment.supervisor}
              getFullName={getFullName}
            />

            {/* Join button */}
            <button
              onClick={handleJoin}
              disabled={!appointmentChosen}
              className="
                w-full mt-2 py-3 rounded-xl font-bold text-xs uppercase tracking-widest
                bg-[#002E6D] text-white
                hover:scale-[1.02] transition-all
                disabled:opacity-40 disabled:hover:scale-100
              "
            >
              Unirse a la consulta
            </button>
          </div>
        )}

        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
};

const ParticipantRow = ({
  label,
  person,
  getFullName,
}: {
  label: string;
  person: any;
  getFullName: (p: any) => string;
}) => {
  const url = person?.usuario?.photourl;

  return (
    <div className="
      flex flex-row items-center gap-3
      shadow-2xl
      p-3 rounded-2xl border border-slate-200 bg-white
    ">
      {/* Left — square photo */}
      <img
        src={url || PersonIcon}
        alt=""
        className="w-12 h-12 object-cover shrink-0 bg-slate-200"
      />

      {/* Right — info */}
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] uppercase tracking-wider text-slate-500">
          {label}
        </span>
        <span className="text-[#002E6D] font-medium truncate">
          {getFullName(person)}
        </span>
        <span className="text-[10px] text-slate-400 truncate">
          {person?.usuario?.uuid}
        </span>
      </div>
    </div>
  );
};

export default AppointmentsPanel;