// components/users/DisplayUsers.tsx
'use client';

import { useState } from 'react';
import { Participant } from '@/lib/models/User';

interface DisplayUsersProps {
  userList: Participant[];
  setUser: (user: Participant) => void;
  selectedUserId?: string;
  label?: string;
}

const DisplayUsers = ({ 
  userList, 
  setUser, 
  selectedUserId,
  label
}: DisplayUsersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (user: Participant) => {
    setUser(user);
    setIsOpen(false);
  };

  const selectedUser = userList.find(u => u.usuario.uuid === selectedUserId);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className={selectedUser ? 'text-gray-900' : 'text-gray-500'}>
          {selectedUser 
            ? `${selectedUser.usuario.nombre} ${selectedUser.usuario.apellido_p} ${selectedUser.usuario.apellido_m}`
            : label
          }
        </span>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="py-1">
            {userList.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">
                No hay usuarios disponibles
              </div>
            ) : (
              userList.map((participant) => (
                <button
                  key={participant.usuario.uuid}
                  onClick={() => handleSelect(participant)}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors ${
                    selectedUserId === participant.usuario.uuid ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {participant.usuario.nombre} {participant.usuario.apellido_p} {participant.usuario.apellido_m}
                    </span>
                    <span className="text-xs text-gray-500">
                      ID: {participant.usuario.uuid}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayUsers;