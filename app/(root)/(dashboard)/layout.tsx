'use client'

import { Footer } from '@/components/dashboard/Footer';
import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import { ReactNode } from 'react';


const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className='bg-white'>
      <div className='sticky z-50'>
        <Navbar/>
        <Sidebar/>
      </div>
      
      <div className="w-full flex flex-row justify-start">
        <section className='w-full z-0'>
          <div className="w-full">{children}</div>
        </section>
      </div>

      <Footer/>
    </main>
  );
};

export default RootLayout;