import { Footer } from '@/components/dashboard/Footer';
import Navbar from '@/components/dashboard/Navbar';
import { ReactNode } from 'react';


const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className="flex flex-col">
      <Navbar/>
      <section className="flex flex-row md:flex-col">
        <div className="w-full">{children}</div>
      </section>
      <Footer/>
    </main>
  );
};

export default RootLayout;