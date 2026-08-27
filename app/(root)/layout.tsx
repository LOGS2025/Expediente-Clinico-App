'use client'

import { ReactNode } from 'react';
import VideoProvider from '@/providers/VideoProvider';



const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className="relative bg-white">
      <div className="flex">
        <VideoProvider>
          <div className="w-full">{children}</div>
        </VideoProvider>
      </div>
    </main>
  );
};

export default RootLayout;
