// components/appointments/AppointmentForm.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPatientList, getSupervisorList, getTelemedicList, getUserList } from '@/lib/supabase/users';
import { Participant, User } from '@/lib/models/User';
import DisplayUsers from '@/components/ui/DisplayUsers';
import Form from '@/components/ui/Form';
import ErrorMessage from '@/components/ui/Error';
import { createAppointment } from '@/lib/supabase/appointments';
import { AppointmentToSupabase } from '@/lib/models/Appointment';

interface AppointmentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}
//   body: JSON.stringify({
//     fk_paciente: patientId,
//     fk_doctor: doctorId,
//     fk_supervisor: supervisorId || null,
//     pendiente: true,
//   }),

const supTmp : User = {
  user_id: "80b41055-4cc6-4712-84d2-2686227fd46a",
  nombre: "Ana",
  apellido_p: "Torres",
  apellido_m: "Sánchez",
  role: 'supervisor'
}

export const AppointmentForm = ({onSuccess,onCancel}: AppointmentFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [patientList, setPatientList] = useState< Participant[] | null >(null);
  const [telemedicList, setTelemedicList] = useState< Participant[] | null >(null);

  const [selAsPacient, setPacient] = useState<Participant | undefined >(undefined);
  const [selAsDoctor, setDoctor] = useState<Participant | undefined >(undefined);

  useEffect(() => {
    (async () => {
      const patientList = await getPatientList();
      if ( patientList ) {
        setPatientList(patientList);
      }
      else {
        setError("No patients");
      }
      const telemedicList = await getTelemedicList();
      if ( telemedicList ) {
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
      else if ( (selAsPacient?.usuario.user_id == selAsDoctor?.usuario.user_id) ) {
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
      else if ( (selAsPacient?.usuario.user_id == selAsDoctor?.usuario.user_id) ) {
        setError("Can't set the same participant as different roles!");
        throw new Error("Same UUID for participants!");
      } else {
        setError(null);
      }

      const body : AppointmentToSupabase = {
        callid: crypto.randomUUID(),
        patient_uuid: selAsPacient.usuario.user_id,
        telemedic_uuid: selAsDoctor.usuario.user_id,
        // The supervisor data MUST come from the store
        supervisor_uuid: supTmp.user_id
      }
      const response = await createAppointment(body);

      onSuccess?.();
      router.refresh();
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al crear la cita');
    } finally {
      setLoading(false);
    }
  };

  if ( !patientList || !telemedicList ) {
    return (<>No users loaded</>)
  }

  return (
    <div className='flex flex-col text-gray-900 max-w-lg min-w-64 p-5 border border-blue-400 rounded-4xl bg-white'>
      { error ? ( 
        <ErrorMessage message={error} />
    ) : ( <></> ) }

      {/* Space to see all users */}
        <div className='flex flex-col gap-8'>
          { patientList ? (
            <DisplayUsers userList={patientList} setUser={setPacient} selectedUserId={selAsPacient?.usuario.user_id} label='Selecciona un paciente'/>
          ) : (<></>)
            }
          { telemedicList ? (
            <DisplayUsers userList={telemedicList} setUser={setDoctor} selectedUserId={selAsDoctor?.usuario.user_id} label='Selecciona un telemedico'/>
          ) : (<></>)
            }
        </div>

      <div className='pt-7'>
        <Form onSuccess={handleSubmit}/>
      </div>

    </div>
  );
};

export default AppointmentForm;