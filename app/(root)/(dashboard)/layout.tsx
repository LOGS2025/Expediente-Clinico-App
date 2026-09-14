'use client'

import Accountbar from '@/components/dashboard/Accountbar';
import { Footer } from '@/components/dashboard/Footer';
import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import { DragTest } from '@/components/ui/PseudoWindow';
import { ReactNode } from 'react';


const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className='flex flex-col bg-blue-100'>
      <div className='sticky top-0 z-50'>
        <Navbar/>
      </div>
      <Accountbar/>
      
      <div className="w-full flex flex-row justify-start">
        <div className='w-75 z-20'>
          <Sidebar/>
        </div>
        <section className='w-full z-0'>
          <div className="w-full">{children}</div>
        </section>
      </div>

      <Footer/>
    </main>
  );
};

export default RootLayout;