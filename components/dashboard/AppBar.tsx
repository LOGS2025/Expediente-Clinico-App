// components/ui/AppBar.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { chatpgtSVG, NotesIcon } from "@/assets/images";
import DraggableAPCs from '../ui/PseudoAPCData';

export const AppBar = () => {
  const [showAPCs, setShowAPCs] = useState(false);

  return (
    <>
      {/* Fixed AppBar */}
      <div className="fixed bottom-10 right-10 z-40">
        <div className="relative flex flex-row items-end gap-x-2 p-2">
          {/* ChatGPT Button */}
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl">
              <button onClick={() => console.log('Chat')}>
                <Image 
                  src={chatpgtSVG} 
                  width={100} 
                  height={100} 
                  alt="Chat" 
                />
              </button>
            </div>
          </div>

          {/* APC Button */}
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl">
              <button onClick={() => setShowAPCs(true)}>
                <Image 
                  src={NotesIcon} 
                  width={80} 
                  height={80} 
                  alt="APC Guide" 
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Show APC Guide when clicked */}
      {showAPCs && (
        <DraggableAPCs onClose={() => setShowAPCs(false)} />
      )}
    </>
  );
};