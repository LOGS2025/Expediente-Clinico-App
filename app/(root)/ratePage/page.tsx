// app/rate/page.tsx
'use client';

import { PersonIcon } from "@/assets/images";
import { Participant } from "@/lib/models/User";
import { getPatientList, getSupervisorList, getTelemedicList } from "@/lib/supabase/users";
import { useEffect, useState } from "react";

/**
 * Color palette
 * #DCE0E8 - light
 * #8EA1AE - muted
 * #27363F - dark
 * #6B212C - red
 * #685652 - brown
 * #BEB3AC - tan
 */

const CommentBox = ({ personList }: { personList: [Participant] | undefined }) => {
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleCommentClick = (uuid: string) => {
    setActiveCommentId(activeCommentId === uuid ? null : uuid);
    setCommentText('');
  };

  const handleSubmit = (person: Participant) => {
    console.log('Comment for:', person.usuario.uuid, commentText);
    // TODO: save comment
    setActiveCommentId(null);
    setCommentText('');
  };

  return (
    <div className="flex flex-col gap-2">
      {personList && personList.map((person) => {
        const isCommenting = activeCommentId === person.usuario.uuid;
        const url = person.usuario.photourl;

        return (
          <div
            key={person.usuario.uuid}
            className="rounded-2xl p-3"
            style={{ backgroundColor: '#DCE0E8' }}
          >
            {/* User row */}
            <div className="flex flex-row items-center justify-between gap-3">
              <div className="flex flex-row items-center gap-3">
                <div
                  className="relative w-10 h-10 rounded-full overflow-hidden shrink-0"
                  style={{ backgroundColor: '#BEB3AC' }}
                >
                  <img
                    src={url || PersonIcon}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>

                <span className="font-medium" style={{ color: '#27363F' }}>
                  {person.usuario.nombre} {person.usuario.apellido_p} {person.usuario.apellido_m}
                </span>
              </div>

              <button
                onClick={() => handleCommentClick(person.usuario.uuid)}
                className="px-4 py-1.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: isCommenting ? '#6B212C' : '#27363F',
                  color: '#DCE0E8',
                }}
              >
                {isCommenting ? 'Cancelar' : 'Comentar'}
              </button>
            </div>

            {/* Comment form */}
            {isCommenting && (
              <div className="mt-3 flex flex-col gap-2">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Escribe un comentario..."
                  rows={3}
                  className="w-full p-3 rounded-xl text-sm resize-none outline-none"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#27363F',
                    border: '1px solid #8EA1AE',
                  }}
                />

                <button
                  onClick={() => handleSubmit(person)}
                  disabled={!commentText.trim()}
                  className="self-end px-4 py-1.5 rounded-xl text-sm font-medium transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                  style={{
                    backgroundColor: '#685652',
                    color: '#DCE0E8',
                  }}
                >
                  Guardar
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const RatePage = () => {
  const [patients, setPatients] = useState<[Participant]>();
  const [telemedics, setTelemedics] = useState<[Participant]>();
  const [supervisors, setSupervisors] = useState<[Participant]>();

  const [target, setTarget] = useState<Participant | undefined>();

  useEffect(() => {
    const getAll = async () => {
      const supervisors: [Participant] = await getSupervisorList();
      const patients: [Participant] = await getPatientList();
      const telemedics: [Participant] = await getTelemedicList();

      if (patients) setPatients(patients);
      if (telemedics) setTelemedics(telemedics);
      if (supervisors) setSupervisors(supervisors);
    };
    getAll();
  }, []);

  return (
    <div className="h-fit p-6 flex flex-col gap-8" style={{ color: '#27363F' }}>
      {/* Patients */}
      <section>
        <h2
          className="text-lg font-semibold mb-3 pb-1"
          style={{ color: '#27363F', borderBottom: '1px solid #8EA1AE' }}
        >
          Pacientes
        </h2>
        <CommentBox personList={patients} />
      </section>

      {/* Telemedics */}
      <section>
        <h2
          className="text-lg font-semibold mb-3 pb-1"
          style={{ color: '#27363F', borderBottom: '1px solid #8EA1AE' }}
        >
          Telemédicos
        </h2>
        <CommentBox personList={telemedics} />
      </section>

      {/* Supervisors */}
      <section>
        <h2
          className="text-lg font-semibold mb-3 pb-1"
          style={{ color: '#27363F', borderBottom: '1px solid #8EA1AE' }}
        >
          Supervisores
        </h2>
        <CommentBox personList={supervisors} />
      </section>
    </div>
  );
};

export default RatePage;