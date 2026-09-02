'use client'

import Navbar from '@/components/dashboard/Navbar';
import { ReactNode } from 'react';

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => { 
  return (
    <div className='w-dvw h-dvh bg-gray-900'>
      <div className="flex flex-col">
        <Navbar/>
        <div className="w-full h-auto">{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;