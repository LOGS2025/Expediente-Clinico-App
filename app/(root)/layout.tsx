import { ReactNode } from 'react';

import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className="relative">
      <div className="flex">
          <div className="w-full">{children}</div>
      </div>
    </main>
  );
};

export default RootLayout;
