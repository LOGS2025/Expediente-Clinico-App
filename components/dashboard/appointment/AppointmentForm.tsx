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
    //   { error ? ( 
    //     <ErrorMessage message={error} />
    // ) : ( <></> ) }
    <div className="card">
      <ul className="list">
        <li className="element">
          <svg
            className="lucide lucide-user-round-plus"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="#7e8590"
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 21a8 8 0 0 1 13.292-6"></path>
            <circle r="5" cy="8" cx="10"></circle>
            <path d="M19 16v6"></path>
            <path d="M22 19h-6"></path>
          </svg>
          <p className="label">Anadir paciente</p>
        </li>
        <li className="element">
          <svg
            className="lucide lucide-user-round-plus"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="#7e8590"
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 21a8 8 0 0 1 13.292-6"></path>
            <circle r="5" cy="8" cx="10"></circle>
            <path d="M19 16v6"></path>
            <path d="M22 19h-6"></path>
          </svg>
          <p className="label">Anadir telemedico</p>
        </li>
      </ul>
      <div className="separator"></div>
      <ul className="list">
        <li className="element">
          <svg
            className="lucide lucide-settings"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="#7e8590"
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
            ></path>
            <circle r="3" cy="12" cx="12"></circle>
          </svg>
          <p className="label">Supervisor</p>
        </li>
        <li className="element delete">
          <svg
            className="lucide lucide-trash-2"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="#7e8590"
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            <line y2="17" y1="11" x2="10" x1="10"></line>
            <line y2="17" y1="11" x2="14" x1="14"></line>
          </svg>
          <p className="label">Limpiar</p>
        </li>
      </ul>
      <div className="separator"></div>
      <ul className="list">
        <li className="element">
          <svg
            className="lucide lucide-users-round"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="#7e8590"
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 21a8 8 0 0 0-16 0"></path>
            <circle r="5" cy="8" cx="10"></circle>
            <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
          </svg>
          <p className="label">Construir pareja</p>
        </li>
      </ul>
    </div>
  );
};

export default AppointmentForm;