'use client'

import Navbar from '@/components/dashboard/Navbar';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => { 
  const router = useRouter();
  const client = useStreamVideoClient();

  useEffect(()=>{
    if ( !client ) { router.push('/sign-in')};
  },[])

  return (
    <div className='w-dvw h-dvh'>
      {/* <Navbar/> */}
        <div className="flex flex-col">
          <div className="w-full">{children}</div>
        </div>
    </div>
  );
};

export default RootLayout;