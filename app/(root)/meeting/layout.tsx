import Navbar from '@/components/dashboard/Navbar';
import VideoProvider from '@/providers/VideoProvider';
import { ReactNode } from 'react';

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <div className='w-dvw h-dvh'>
      {/* <Navbar/> */}

      <VideoProvider>
        <div className="flex flex-col">
          <div className="w-full">{children}</div>
        </div>
      </VideoProvider>
    </div>
  );
};

export default RootLayout;