// components/appointments/AppointmentForm.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserList } from '@/lib/supabase/users';
import { User } from '@/lib/models/User';
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
//     fecha: fechaCompleta.toISOString(),
//     motif: formData.motif,
//     pendiente: true,
//   }),

export const AppointmentForm = ({onSuccess,onCancel}: AppointmentFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({  fecha: '',  hora: '',  motif: '',});
  const [userList, setUserList] = useState< [User] | null >(null);

  const [selAsPacient, setPacient] = useState<User | undefined >(undefined);
  const [selAsDoctor, setDoctor] = useState<User | undefined >(undefined);
  const [selAsSupervisor, setSupervisor] = useState<User | undefined >(undefined);

  useEffect(() => {
    (async () => {
      const userlist = await getUserList();
      if ( userlist ) {
        setUserList(userlist);
      }
    })(); 
  }, []);

  useEffect(()=>{
    if ( (selAsPacient?.user_id == selAsDoctor?.user_id) || (selAsPacient?.user_id == selAsSupervisor?.user_id) || (selAsSupervisor?.user_id == selAsDoctor?.user_id) ) {
      setError("Can't set the same participant as different roles!");
    } else {
      setError(null);
    }
  },[selAsDoctor, selAsPacient, selAsSupervisor]);

  const handleSubmit = async () => {
    console.log("Entered body formation!!!");

    setLoading(true);
    setError(null);

    try {
      const fechaCompleta = new Date(`${formData.fecha}T${formData.hora}`);

      if ( !selAsDoctor || !selAsPacient ) {
        setError("Missing UUID for participants!");
        throw new Error("Missing UUID for participants!");
      }

      const body : AppointmentToSupabase = {
        date: fechaCompleta,
        motif: formData.motif,
        patient_uuid: selAsPacient.user_id,
        doctor_uuid: selAsDoctor.user_id,
        supervisor_uuid: selAsSupervisor ? selAsSupervisor.user_id : null
      }

      const response = await createAppointment(body);
      if (!response.ok) {
        setError('Error al crear la cita!');
        throw new Error('Error al crear la cita');
      }

      onSuccess?.();
      router.refresh();
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al crear la cita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col text-gray-900 max-w-lg min-w-64 p-5 border border-blue-400 rounded-4xl bg-white'>
      { error ? ( 
        <ErrorMessage message={error} />
    ) : ( <></> ) }

      {/* Space to see all users */}
      { userList ? (
        <div className='flex flex-col gap-8'>
          <DisplayUsers userList={userList} setUser={setPacient} selectedUserId={selAsPacient?.user_id}/>
          
          <DisplayUsers userList={userList} setUser={setDoctor} selectedUserId={selAsDoctor?.user_id}/>
          
          <DisplayUsers userList={userList} setUser={setSupervisor} selectedUserId={selAsSupervisor?.user_id}/>
        </div>
      ) : (<>No users loaded</>) }

      <div className='pt-7'>
        <Form setForm={setFormData} onSuccess={handleSubmit}/>
      </div>

    </div>
  );
};

export default AppointmentForm;