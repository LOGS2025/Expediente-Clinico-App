// components/appointments/AppointmentForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPatientList, getTelemedicList } from '@/lib/supabase/users';
import { Participant } from '@/lib/models/User';
import DisplayUsers from '@/components/ui/DisplayUsers';
import Form from '@/components/ui/Form';
import ErrorMessage from '@/components/ui/Error';
import { createAppointment } from '@/lib/supabase/appointments';
import { AppointmentToSupabase } from '@/lib/models/Appointment';
import { useBoundStore } from '@/lib/hooks/useBoundStore';

import './AppointmentForm.css'
import { AddPersonSVG, PeopleSVG, TrashcanSVG } from '@/assets/svg-store';

interface AppointmentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const AppointmentForm = ({onSuccess,onCancel}: AppointmentFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userState = useBoundStore((state)=>state);

  const [patientList, setPatientList] = useState< Participant[] | null >(null);
  const [telemedicList, setTelemedicList] = useState< Participant[] | null >(null);

  const [selAsPacient, setPacient] = useState<Participant | undefined >(undefined);
  const [selAsDoctor, setDoctor] = useState<Participant | undefined >(undefined);


  useEffect(() => {
    (async () => {
      const patientList = await getPatientList();
      if ( patientList ) {
        console.log(patientList);
        setPatientList(patientList);
      }
      else {
        setError("No patients");
      }
      const telemedicList = await getTelemedicList();
      if ( telemedicList ) {
        console.log(telemedicList);
        setTelemedicList(telemedicList);
      }
      else {
        setError("No Telemedics");
      }
    })(); 
  }, []);

  useEffect(()=>{
      if ( !selAsDoctor || !selAsPacient ) {
        setError("Missing UUID for participants!");
      }
      else if ( (selAsPacient?.usuario.uuid == selAsDoctor?.usuario.uuid) ) {
        setError("Can't set the same participant as different roles!");
      } else {
        setError(null);
      }
  },[selAsDoctor, selAsPacient]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if ( !selAsDoctor || !selAsPacient ) {
        setError("Missing UUID for participants!");
        throw new Error("Missing UUID for participants!");
      }
      else if ( (selAsPacient?.usuario.uuid == selAsDoctor?.usuario.uuid) ) {
        setError("Can't set the same participant as different roles!");
        throw new Error("Same UUID for participants!");
      } else {
        setError(null);
      }
      
      const ourUUID = userState.getID();
      if ( !ourUUID ) {
        userState.logout();
        throw new Error("We don't have an ID!");
      }

      const body : AppointmentToSupabase = {
        callid: crypto.randomUUID(),
        patient_uuid: selAsPacient.usuario.uuid,
        telemedic_uuid: selAsDoctor.usuario.uuid,
        // The supervisor data MUST come from the store
        supervisor_uuid: ourUUID
      }
      const response = await createAppointment(body);

      onSuccess?.();
      router.refresh();
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al crear la consulta');
    } finally {
      setLoading(false);
    }
  };

  if ( !patientList || !telemedicList ) {
    return (
    <ErrorMessage message={"Cargando usuarios"} />
  )
  }

  return (
    <div className='w-full flex flex-col gap-6 font-bold text-sm'>
      {/* Add pacient */}
      <div>
        <button className='bg-white w-full flex flex-nowrap p-4 rounded-3xl
        hover:shadow-[0px_0px_20px_4px_rgba(3,102,214,0.3)]
        shadow-[0px_0px_9px_rgba(3,102,214,0.3)]
        justify-between
        '>
          Anadir x <AddPersonSVG/>
        </button>
      </div>
      {/* Add telemedic */}
      <div>
        <button className='bg-white w-full flex flex-nowrap p-4 rounded-3xl
        hover:shadow-[0px_0px_20px_4px_rgba(3,102,214,0.3)]
        shadow-[0px_0px_9px_rgba(3,102,214,0.3)]
        justify-between
        '>
          Anadir y <AddPersonSVG/>
        </button>
      </div>
      {/* Add supervisor */}
      <div>
        <button className='bg-white w-full flex flex-nowrap p-4 rounded-3xl
        hover:shadow-[0px_0px_20px_4px_rgba(3,102,214,0.3)]
        shadow-[0px_0px_9px_rgba(3,102,214,0.3)]
        justify-between
        '>
          Anadir z <AddPersonSVG/>
        </button>
      </div>
      {/* Pair together */}
      <div>
        <button className='bg-white w-full flex flex-nowrap p-4 rounded-3xl
        hover:shadow-[0px_0px_20px_4px_rgba(3,102,214,0.3)]
        shadow-[0px_0px_9px_rgba(3,102,214,0.3)]
        justify-between
        '>
        Formar pareja <PeopleSVG/>
        </button>
      </div>
      {/* Trash build */}
      <div>
        <button className='bg-white w-full flex flex-nowrap p-4 rounded-3xl
        hover:shadow-[0px_0px_20px_4px_rgba(3,102,214,0.3)]
        shadow-[0px_0px_9px_rgba(3,102,214,0.3)]
        justify-between
        hover:scale-105
        transition-transform
        hover:text-[#8e2a2a]
        '>
          Eliminar <TrashcanSVG/>
        </button>
      </div>
    </div>
  );
};

export default AppointmentForm;
