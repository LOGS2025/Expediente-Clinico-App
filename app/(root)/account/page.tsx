// app/(root)/account/page.tsx
'use client';

import { PersonIcon } from "@/assets/images";
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { useState } from "react";

/**
 * Color palette
 * #DCE0E8 - light
 * #8EA1AE - muted
 * #27363F - dark
 * #6B212C - red
 * #685652 - brown
 * #BEB3AC - tan
 */

const Account = () => {
  const user = useBoundStore((state) => state);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');

  const tabs = [
    { id: 'profile', label: 'Perfil' },
    { id: 'security', label: 'Seguridad' },
  ] as const;

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      doctor: 'Telemédico',
      supervisor: 'Supervisor',
      patient: 'Paciente',
      indefinido: 'Sin asignar',
    };
    return labels[role] || role;
  };

  return (
    <div className="flex flex-row min-h-[60vh] gap-6 p-6" style={{ backgroundColor: '#DCE0E8' }}>
      {/* Left Bar - Tabs */}
      <aside
        className="w-56 shrink-0 rounded-2xl p-3 flex flex-col gap-1"
        style={{ backgroundColor: '#BEB3AC' }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                backgroundColor: isActive ? '#27363F' : 'transparent',
                color: isActive ? '#DCE0E8' : '#27363F',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </aside>

      {/* Main Content */}
      <section
        className="flex-1 rounded-2xl p-6"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="flex flex-col gap-6">
            {/* Header with avatar */}
            <div className="flex flex-row items-center gap-5">
              <div
                className="relative w-24 h-24 rounded-full overflow-hidden shrink-0"
                style={{ backgroundColor: '#BEB3AC' }}
              >
                <img
                  src={user.photoURL || PersonIcon}
                  alt="Foto de perfil"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold" style={{ color: '#27363F' }}>
                  {user.user?.nombre} {user.user?.apellido_p} {user.user?.apellido_m}
                </h1>
                <span
                  className="self-start px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: '#685652', color: '#DCE0E8' }}
                >
                  {getRoleLabel(user.role)}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderBottom: '1px solid #8EA1AE' }} />

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="Nombre" value={user.user?.nombre} />
              <InfoRow label="Apellido paterno" value={user.user?.apellido_p} />
              <InfoRow label="Apellido materno" value={user.user?.apellido_m} />
              <InfoRow label="Correo electrónico" value={user.email} />
              <InfoRow label="Rol" value={getRoleLabel(user.role)} />
              <InfoRow label="UUID" value={user.user?.uuid} mono />
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold" style={{ color: '#27363F' }}>
              Seguridad
            </h2>

            <div className="flex flex-col gap-3">
              <InfoRow label="UID de Firebase" value={user.uid} mono />
              <InfoRow label="Token de sesión" value={user.token ? '••••••••' : 'No disponible'} />
              <InfoRow label="Estado" value={user.loggedIn ? 'Sesión activa' : 'Sin sesión'} />
            </div>

            <button
              onClick={() => user.logout()}
              className="self-start px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105 mt-2"
              style={{ backgroundColor: '#6B212C', color: '#DCE0E8' }}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Account;

/**
 * Row for displaying a single piece of information
 */
const InfoRow = ({ label, value, mono = false }: { label: string; value?: string; mono?: boolean }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#8EA1AE' }}>
        {label}
      </span>
      <span
        className={`text-sm px-3 py-2 rounded-xl ${mono ? 'font-mono text-xs break-all' : ''}`}
        style={{ backgroundColor: '#DCE0E8', color: '#27363F' }}
      >
        {value || '—'}
      </span>
    </div>
  );
};

/**
 * Toggle row for preferences
 */
const ToggleRow = ({ label }: { label: string }) => {
  const [on, setOn] = useState(false);

  return (
    <div className="flex flex-row items-center justify-between gap-3">
      <span className="text-sm" style={{ color: '#27363F' }}>
        {label}
      </span>
      <button
        onClick={() => setOn(!on)}
        className="w-12 h-6 rounded-full transition-all relative"
        style={{ backgroundColor: on ? '#685652' : '#8EA1AE' }}
        aria-pressed={on}
      >
        <span
          className="absolute top-0.5 w-5 h-5 rounded-full transition-all"
          style={{
            backgroundColor: '#DCE0E8',
            left: on ? '26px' : '2px',
          }}
        />
      </button>
    </div>
  );
};