'use client'

import Accountbar from '@/components/dashboard/Accountbar';
import { Footer } from '@/components/dashboard/Footer';
import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import { LayoutProvider } from '@/providers/LayoutContext';
import { ReactNode } from 'react';


const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
  <LayoutProvider>
    <main className='flex flex-row'>
      <div className='hidden lg:block w-[10%] min-w-[200px] sticky top-0 h-dvh'>
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
  </LayoutProvider>
  );
};

export default RootLayout;