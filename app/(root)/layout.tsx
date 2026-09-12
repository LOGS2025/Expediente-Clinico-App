'use client'

import { ReactNode, useEffect } from 'react';
import VideoProvider from '@/providers/VideoProvider';
import { useRouter } from 'next/navigation';
import { useBoundStore } from '@/lib/hooks/useBoundStore';
import { LayoutProvider } from '@/providers/LayoutContext';
import { AppBar } from '@/components/dashboard/AppBar';

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  const router = useRouter();
  const loggedIn = useBoundStore((state)=>state.loggedIn);

  useEffect(()=>{
    if ( !loggedIn ) router.push('/sign-in');
  },[])

  return (
    <main className="relative bg-white">
      <div className="flex">
      <LayoutProvider>
        <VideoProvider>
          <div className="w-full">{children}</div>
        </VideoProvider>
      </LayoutProvider>
      </div>
      <AppBar/>
    </main>
  );
};

export default RootLayout;
