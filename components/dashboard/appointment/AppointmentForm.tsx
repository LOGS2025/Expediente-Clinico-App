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
    return (<>No users loaded</>)
  }

  return (
    <div className='flex flex-col text-gray-500 
    border-gray-300 shadow-xl/30
    min-w-[75%] min-h-100 p-5 border-2 rounded-2xl bg-white
    '>
      { error ? ( 
        <ErrorMessage message={error} />
    ) : ( <></> ) }

      {/* Space to see all users */}
        <div className='flex flex-col gap-8'>
          { patientList ? (
            <DisplayUsers userList={patientList} setUser={setPacient} selectedUserId={selAsPacient?.usuario.uuid} label='Selecciona un paciente'/>
          ) : (<></>)
            }
          { telemedicList ? (
            <DisplayUsers userList={telemedicList} setUser={setDoctor} selectedUserId={selAsDoctor?.usuario.uuid} label='Selecciona un telemedico'/>
          ) : (<></>)
            }
          
          { userState.role == 'supervisor'&&
          <div className="flex flex-col">
            <h2 className='p-3 text-base font-mono opacity-40'>Seras designado como el supervisor de esta consulta.</h2>
            <span className="font-medium">
              Supervisor : {userState.user?.nombre} {userState.user?.apellido_p} {userState.user?.apellido_m}
            </span>
            <span className="text-xs text-gray-500">
              ID: {userState.user?.uuid}
            </span>
          </div>
          }
        </div>

      <div className='pt-7'>
        <Form onSuccess={handleSubmit}/>
      </div>

    </div>
  );
};

export default AppointmentForm;