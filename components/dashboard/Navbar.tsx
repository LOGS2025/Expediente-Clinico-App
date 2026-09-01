// components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTopBarItems } from "@/lib/utils";
import { Top } from "@/lib/utils/barItems";
import { useBoundStore } from '@/lib/hooks/useBoundStore';
import { logo_without_bg, FacmedLogo } from '@/assets/images';

interface NavbarProps {
  selectedTab?: Top | null;
}

const Navbar = ({ selectedTab = null }: NavbarProps) => {
  const topbarItems = useTopBarItems();
  const pathname = usePathname();
  const userInfo = useBoundStore((state)=>state);

  return (
    <header className="top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm w-full">
      <div className="flex flex-row w-full">
        <div className="flex h-[120px] w-full">
          <div className="flex items-center gap-3 flex-shrink-0">
            
            <img src={logo_without_bg.src} 
              className="pl-5 w-auto h-[30%] object-contain left-0" 
              alt="Logo UNAM" 
            />
            <img src={FacmedLogo.src} 
              className=" w-auto h-[30%] object-contain left-0" 
              alt="Logo Facultad de Medicina" 
            />
            
            <div className="items-start">
              <h1 className="text-sm font-bold text-blue-800 dark:text-blue-400 leading-tight font-['Manrope']">
                Sistema ECE Didáctico
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Facultad de Medicina · UNAM
              </p>
              <span>Logged in as {userInfo.getRole()}</span>
            </div>
          
          </div>

          <nav className="flex-1 hidden lg:block">
            <div className='flex gap-1 text-xs font-medium h-full justify-around items-stretch'>
              {topbarItems.map((item) => {
                const isActive = pathname === item.href || item.name === selectedTab;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group relative px-4 py-2.5 rounded-lg transition-all duration-200
                      flex items-center gap-2
                      ${isActive 
                        ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }
                    `}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                    
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
      <span className='fixed top-0'>Logged in as {userInfo.getRole()}</span>
    </header>
  );
};

export default Navbar;