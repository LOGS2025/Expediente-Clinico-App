'use client'

import Accountbar from '@/components/dashboard/Accountbar';
import { Footer } from '@/components/dashboard/Footer';
import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import { ReactNode } from 'react';


const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className='flex flex-row'>
      <div className='hidden lg:block w-[10%] min-w-50 sticky top-0 h-dvh'>
        <Sidebar/>
      </div>
      {/* The right side information for wide displays */}
      <div className="w-full flex flex-col">
        <Navbar/>
        <Accountbar/>
        <section className="flex flex-row md:flex-col">
          <div className="w-full">{children}</div>
        </section>
        <Footer/>
      </div>
    </main>
  );
};

export default RootLayout;