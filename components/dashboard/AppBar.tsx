// components/ui/AppBar.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { chatpgtSVG, NotesIcon, TeletriageIcon } from "@/assets/images";
import DraggableAPCs from '../ui/PseudoAPCData';
import Link from 'next/link';

export const AppBar = () => {
  const [showAPCs, setShowAPCs] = useState(false);

  return (
    <>
      {/* Fixed AppBar */}
      <div className="fixed bottom-10 right-10 z-40">
        <div className="relative flex flex-row items-end gap-x-2 p-2">
          {/* ChatGPT Button */}
          <div className="relative">
            <div className="bg-white  
              w-15 pl-2 h-15 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl">
              <Link href={'https://chatgpt.com/g/g-6z0DZIGeS-teletriage-facmed-v2-1'}>
                <Image 
                  src={TeletriageIcon} 
                  width={80} 
                  height={80} 
                  alt="Chat" 
                />
              </Link>
            </div>
          </div>

          {/* APC Button */}
          <div className="relative">
            <div className="
              w-15 h-15 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl">
              <button onClick={() => setShowAPCs(true)}>
                <Image 
                  src={NotesIcon} 
                  width={60} 
                  height={60} 
                  alt="APC Guide" 
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Show APC Guide when clicked */}
      {showAPCs && (
        <DraggableAPCs onClose={() => setShowAPCs(false)} />
      )}
    </>
  );
};