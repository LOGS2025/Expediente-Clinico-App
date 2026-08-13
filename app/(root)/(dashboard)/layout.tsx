import Navbar from '@/components/dashboard/Navbar';
import { ReactNode } from 'react';


const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className="relative">
      <Navbar selectedTab={"PROUNAM y Guías Clínicas"} />

      <div className="flex">        
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;