import BottomBar from '@/components/dashboard/Bottombar';
import VideoProvider from '@/providers/VideoProvider';
import { ReactNode } from 'react';

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <div>
      <VideoProvider>
        <div className="flex">
          <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
            <div className="w-full">{children}</div>
          </section>
        </div>
        <BottomBar/>
      </VideoProvider>
    </div>
  );
};

export default RootLayout;