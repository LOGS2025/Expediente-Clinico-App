// components/management/Management.tsx
'use client';

import { User } from '@/lib/models/User';
import { getUserList, getUserRole, setPatient, setSupervisor, setTelemedic } from '@/lib/supabase/users';
import { useEffect, useMemo, useState } from 'react';
import { LoaderCloud } from '../ui/LoaderCloud';
import ErrorMessage from '@/components/ui/Error';

import { AddPersonSVG, TrashcanSVG, CheckList } from '@/assets/svg-store';

type Role = 'paciente' | 'telemedico' | 'supervisor';

interface ButtonProps {
  text: string;
  colors: string | null;
  SVG: any;
  onClick: () => void;
  active?: boolean;
}

const RoleButton = ({ text, colors, SVG, onClick, active }: ButtonProps) => {
  return (
    <button
      className={`
        bg-white w-min-[15%] flex flex-nowrap p-4
        justify-between
        shadow-[0px_0px_9px_rgba(0,46,109,0.3)]
        hover:shadow-[0px_0px_20px_4px_rgba(0,46,109,0.3)]
        transition-all duration-200
        ${active ? 'bg-[#002E6D] text-white' : 'text-[var(--btn-color)] hover:text-white hover:bg-[var(--btn-color)]'}
      `}
      style={{ '--btn-color': colors ?? '#002E6D' } as React.CSSProperties}
      onClick={onClick}
    >
      {text} <SVG />
    </button>
  );
};

const roleConfig: Record<Role, { label: string; color: string }> = {
  paciente:   { label: 'Paciente',   color: '#3BD897' },
  telemedico: { label: 'Telemédico', color: '#002E6D' },
  supervisor: { label: 'Supervisor', color: '#DE9AF8' },
};

export const Management = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selUser, setSelUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [currentRole, setCurrentRole] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState('');

  useEffect(() => {
    async function userFetch() {
      setLoading(true);
      const users = await getUserList();
      setUsers(users);
      setLoading(false);
    }
    userFetch();
  }, []);

  useEffect(() => {
    async function getUserData() {
      if (!selUser?.uuid) {
        setCurrentRole(null);
        return;
      }
      const data = await getUserRole(selUser.uuid);
      var rol : string[] = [];
      if (data.supervisor)  rol.push('supervisor');
      if (data.telemedico)  rol.push('telemedico');
      if (data.paciente)    rol.push('paciente');
      setCurrentRole(rol);
    }
    getUserData();
  }, [selUser]);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    const term = search.trim().toLowerCase();
    if (!term) return users;

    return users.filter((u) => {
      const fullName = `${u.nombre} ${u.apellido_p} ${u.apellido_m ?? ''}`.toLowerCase();
      return fullName.includes(term) || u.uuid.toLowerCase().includes(term);
    });
  }, [users, search]);

  const handleAssign = async () => {
    if (!selUser || !selectedRole) {
      setError('Selecciona un usuario y un rol');
      return;
    }

    setSaving(true);
    setError(null);

    try {
        let result : any;
        switch (selectedRole) {
            case 'telemedico':
                    result = await setTelemedic(selUser.uuid);                
                break;
            case 'supervisor':
                    result = await setSupervisor(selUser.uuid);                
                break;
            case 'paciente':
                    result = await setPatient(selUser.uuid);                
                break;
            default:
                console.error("Nothing applies");
                break;
        }
      if (!result) throw new Error('No se pudo asignar el rol');

      setCurrentRole(null);
      setSelectedRole(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al asignar');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSelUser(null);
    setSelectedRole(null);
    setError(null);
  };

  if (loading) return <LoaderCloud />;

  return (
    <div className="flex flex-row w-full gap-4 p-4">
      {/* Column 1 — Role buttons */}
      <div className="w-fit flex flex-col gap-6 font-bold text-sm">
        {(Object.keys(roleConfig) as Role[]).map((role) => (
          <RoleButton
            key={role}
            text={`Asignar ${roleConfig[role].label}`}
            colors={roleConfig[role].color}
            SVG={AddPersonSVG}
            active={selectedRole === role}
            onClick={() => {
                if ( currentRole?.includes(role) ){
                    return;
                } 
                setSelectedRole(role);
            }}
          />
        ))}

        <RoleButton
          text="Confirmar"
          colors="#002E6D"
          SVG={CheckList}
          onClick={handleAssign}
        />

        <RoleButton
          text="Eliminar selección"
          colors="#DE9AF8"
          SVG={TrashcanSVG}
          onClick={handleReset}
        />
      </div>

      {/* Column 2 — User list with search */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <h3 className="font-bold text-sm mb-2">Usuarios</h3>

        {/* Search bar */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre o UUID..."
          className="
            w-full p-2 mb-2
            shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)]
            border border-slate-300
            text-sm
            focus:outline-none focus:border-[#002E6D]
          "
        />

        <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
          {filteredUsers.length === 0 ? (
            <div className="text-center text-sm text-slate-400 py-6">
              No se encontraron usuarios
            </div>
          ) : (
            filteredUsers.map((u) => {
              const isSelected = selUser?.uuid === u.uuid;
              return (
                <button
                  key={u.uuid}
                  onClick={() => setSelUser(isSelected ? null : u)}
                  className={`
                    shadow-2xl border p-2 text-left
                    flex flex-row items-center justify-between gap-3
                    ${isSelected ? 'border-[#002E6D] bg-[#002E6D] text-white' : ''}
                  `}
                >
                  <span className="truncate">
                    {u.nombre} {u.apellido_p} {u.apellido_m ?? ''}
                  </span>

                  <img
                    src={u.photourl || '/default-avatar.png'}
                    alt=""
                    className="w-10 h-10 object-cover shrink-0"
                  />
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Column 3 — Selected summary */}
      <div className="flex flex-col gap-4 w-fit">
        <h3 className="font-bold text-sm mb-2">Selección</h3>

        <div className="flex flex-col gap-3">
          {/* User */}
          <div className="shadow-2xl border p-3">
            <span className="block text-xs uppercase text-slate-500">
              Usuario
            </span>
            <div className="flex flex-row items-center gap-3 mt-2">
              <img
                src={selUser?.photourl || '/default-avatar.png'}
                alt=""
                className="w-10 h-10 object-cover shrink-0 bg-slate-200"
              />
              <span>
                {selUser
                  ? `${selUser.nombre} ${selUser.apellido_p} ${selUser.apellido_m ?? ''}`
                  : '—'}
              </span>
            </div>
          </div>

          {/* Current role */}
          <div className="shadow-2xl border p-3">
            <span className="block text-xs uppercase text-slate-500">
              Rol actual
            </span>
            <span className="capitalize flex flex-col">
            { currentRole && currentRole.map((rol)=>(
                <span key={rol} className='font-light'>{rol}</span>
            ))}
            </span>
          </div>

          {/* New role */}
          <div className="shadow-2xl border p-3">
            <span className="block text-xs uppercase text-slate-500">
              Nuevo rol
            </span>
            <span className="capitalize">
              {selectedRole ?? '—'}
            </span>
          </div>
        </div>

        {/* Confirm button */}
        <button
          onClick={handleAssign}
          disabled={saving || !selUser || !selectedRole}
          className="bg-[#002E6D] text-white p-4 font-bold disabled:opacity-40"
        >
          {saving ? 'Asignando...' : 'Asignar rol'}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default Management;