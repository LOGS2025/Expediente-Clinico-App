// components/layout/Navbar.tsx
'use client';
import AccountSVG from '@/assets/account.svg';
import SettingsSVG from '@/assets/setting.svg';
import ListSVG from '@/assets/list.svg';

import Image from 'next/image';

import { usePathname } from 'next/navigation';
import { useBoundStore } from '@/lib/hooks/useBoundStore';


const Accountbar = () => {
  const pathname = usePathname();
  const userInfo = useBoundStore((state)=>state);

  return (
    <header className="bg-red-500 w-full">
      <nav>
        <ul className='flex flex-row justify-around text-base p-2'>
          <li className='w-full'>    <button className='
      border-l border-black 
      w-full flex flex-row items-center gap-2 
      px-4 py-2 hover:rounded-lg
      transition-all duration-300 ease-in-out
      hover:scale-130 hover:font-bold 
      hover:shadow-lg hover:shadow-xl/30
      hover:bg-red-400
      focus:outline-none focus:ring-2 focus:ring-blue-400
    '> 
            <Image width={24} height={24} alt='Person silouette' src={AccountSVG.src}/>Cuenta
            </button></li>
          <li className='w-full'>    <button className='
      border-l border-black 
      w-full flex flex-row items-center gap-2 
      px-4 py-2 hover:rounded-lg
      transition-all duration-300 ease-in-out
      hover:scale-130 hover:font-bold 
      hover:shadow-lg hover:shadow-xl/30
      hover:bg-red-400
      focus:outline-none focus:ring-2 focus:ring-blue-400
    '> 
            <Image width={24} height={24} alt='Gray gear as settings icon' src={SettingsSVG.src}/>Settings
            </button></li>
          <li className='w-full'>    <button className='
      border-l border-black 
      w-full flex flex-row items-center gap-2 
      px-4 py-2 hover:rounded-lg
      transition-all duration-300 ease-in-out
      hover:scale-130 hover:font-bold 
      hover:shadow-lg hover:shadow-xl/30
      hover:bg-red-400
      focus:outline-none focus:ring-2 focus:ring-blue-400
    '> 
            <Image width={24} height={24} alt='Bullet point list icon' src={ListSVG.src}/>Personal
            </button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Accountbar;