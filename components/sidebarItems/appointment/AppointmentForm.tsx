// components/appointments/AppointmentForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPatientList, getTelemedicList } from '@/lib/supabase/users';
import { Participant } from '@/lib/models/User';
import ErrorMessage from '@/components/ui/Error';
import { createAppointment } from '@/lib/supabase/appointments';
import { AppointmentToSupabase } from '@/lib/models/Appointment';
import { useBoundStore } from '@/lib/hooks/useBoundStore';

import { AddPersonSVG, PeopleSVG, TrashcanSVG } from '@/assets/svg-store';
import { LoaderCloud } from '@/components/ui/LoaderCloud';
import Image from 'next/image';

interface AppointmentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface ButtonProps {
  text: string;
  colors: any | null;
  SVG: any;
  onClick: () => void;
}

const AppointmentButton = ({ text, colors, SVG, onClick }: ButtonProps) => {
  return (
<button
  className="
    bg-white w-min-[15%] flex flex-nowrap p-4
    text-[var(--btn-color)]
    hover:text-white
    hover:bg-[var(--btn-color)]
    shadow-[0px_0px_9px_rgba(0,46,109,0.3)]
    hover:shadow-[0px_0px_20px_4px_rgba(0,46,109,0.3)]
    justify-between
    transition-all duration-200
  "
  style={{ '--btn-color': colors } as React.CSSProperties}
  onClick={() => onClick()}
>
  {text} <SVG />
</button>
  );
};

export const AppointmentForm = ({ onSuccess, onCancel }: AppointmentFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userState = useBoundStore((state) => state);

  const [patientList, setPatientList] = useState<Participant[] | null>(null);
  const [telemedicList, setTelemedicList] = useState<Participant[] | null>(null);

  const [selAsPacient, setPacient] = useState<Participant | undefined>(undefined);
  const [selAsDoctor, setDoctor] = useState<Participant | undefined>(undefined);

  const [showPatients, setShowPatients] = useState<boolean>(true);

  // Get the patient and telemedic list
  useEffect(() => {
    (async () => {
      const patientList = await getPatientList();
      if (patientList) {
        console.log(patientList);
        setPatientList(patientList);
      } else {
        setError('No patients');
      }
      const telemedicList = await getTelemedicList();
      if (telemedicList) {
        console.log(telemedicList);
        setTelemedicList(telemedicList);
      } else {
        setError('No Telemedics');
      }
    })();
  }, []);

  useEffect(() => {
    if (!selAsDoctor || !selAsPacient) {
      setError('Missing UUID for participants!');
    } else if (selAsPacient?.usuario.uuid === selAsDoctor?.usuario.uuid) {
      setError("Can't set the same participant as different roles!");
    } else {
      setError(null);
    }
  }, [selAsDoctor, selAsPacient]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!selAsDoctor || !selAsPacient) {
        setError('Missing UUID for participants!');
        throw new Error('Missing UUID for participants!');
      } else if (selAsPacient?.usuario.uuid === selAsDoctor?.usuario.uuid) {
        setError("Can't set the same participant as different roles!");
        throw new Error('Same UUID for participants!');
      } else {
        setError(null);
      }

      const ourUUID = userState.getID();
      if (!ourUUID) {
        userState.logout();
        throw new Error("We don't have an ID!");
      }

      const body: AppointmentToSupabase = {
        callid: crypto.randomUUID(),
        patient_uuid: selAsPacient.usuario.uuid,
        telemedic_uuid: selAsDoctor.usuario.uuid,
        supervisor_uuid: ourUUID,
      };
      const response = await createAppointment(body);
      console.log(response);

      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al crear la consulta');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPacient(undefined);
    setDoctor(undefined);
    setError(null);
  };

  if (!patientList || !telemedicList) return <LoaderCloud />;

  const activeList = showPatients ? patientList : telemedicList;

  if ( loading ) {
    return (
      <LoaderCloud/>
    )
  }

  return (
    <div className="flex flex-row w-full">
      {/* Column 1 — Buttons */}
      <div className="w-fit flex flex-col gap-6 font-bold text-sm p-4">
        <AppointmentButton
          text="Añadir paciente"
          colors={"#002E6D"}
          SVG={AddPersonSVG}
          onClick={() => {
            setShowPatients(true);
            setPacient(undefined);
          }}
        />
        <AppointmentButton
          text="Añadir telemedico"
          colors={"#002E6D"}
          SVG={AddPersonSVG}
          onClick={() => {
            setShowPatients(false);
            setDoctor(undefined);
          }}
        />
        <AppointmentButton
          text="Formar pareja"
          colors={"#3BD897"}
          SVG={PeopleSVG}
          onClick={() => {
            handleSubmit();
          }}
        />
        <AppointmentButton
          text="Eliminar"
          colors={"#DE9AF8"}
          SVG={TrashcanSVG}
          onClick={handleReset}
        />
      </div>

      {/* Column 2 — Users of the active list */}
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-bold text-sm mb-2">
          {showPatients ? 'Pacientes' : 'Telemédicos'}
        </h3>

        <div className="flex flex-col gap-6">
          {activeList.map((person) => {
            const isSelected = showPatients
              ? selAsPacient?.usuario.uuid === person.usuario.uuid
              : selAsDoctor?.usuario.uuid === person.usuario.uuid;

            return (
              <button
                key={person.usuario.uuid}
                onClick={() =>
                  showPatients ? setPacient(person) : setDoctor(person)
                }
                className={`shadow-2xl min-w-[20%] border p-2 text-left max-h-20 flex flex-row justify-between
                  ${isSelected ? 'border-[#002E6D] bg-[#002E6D] text-white' : ''}
                `}
              >
                <span>{person.usuario.nombre} {person.usuario.apellido_p} {person.usuario.apellido_m ? person.usuario.apellido_m : ''}</span>
                <img src={person.usuario.photourl} alt='foto de usuario' className='h-full'/>
              </button>
            );
          })}
        </div>
      </div>

      {/* Column 3 — Selected summary */}
      <div className="flex flex-col gap-4 p-4 w-fit">
        <h3 className="font-bold text-sm mb-2">Selección</h3>

        <div className="flex flex-col gap-3">
          <div className="shadow-2xl border p-3">
            <span className="block text-xs uppercase text-slate-500">
              Paciente
            </span>
            <span>
              <img src={selAsPacient?.usuario.photourl} className='h-auto'/>
              {selAsPacient
                ? `${selAsPacient.usuario.nombre} ${selAsPacient.usuario.apellido_p} ${selAsPacient.usuario.apellido_m}`
                : '—'}
            </span>
          </div>

          <div className="shadow-2xl border p-3">
            <span className="block text-xs uppercase text-slate-500">
              Telemédico
            </span>
            <span>
              <img src={selAsDoctor?.usuario.photourl} className='h-auto'/>
              {selAsDoctor
                ? `${selAsDoctor.usuario.nombre} ${selAsDoctor.usuario.apellido_p} ${selAsDoctor.usuario.apellido_m}`
                : '—'}
            </span>
          </div>

          <div className="shadow-2xl border p-3">
            <span className="block text-xs uppercase text-slate-500">
              Supervisor
            </span>
            <div className='felx flex-row flex-nowrap'>
              <img src={userState.photoURL} className='h-auto'/>
              <span > {userState.getName() || 'Tú'}</span>
            </div>
          </div>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default AppointmentForm;