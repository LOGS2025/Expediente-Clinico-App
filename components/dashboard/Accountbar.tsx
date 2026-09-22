// components/layout/Navbar.tsx
'use client';
import SettingsSVG from '@/assets/setting.svg';
import ListSVG from '@/assets/list.svg';

import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { useBoundStore } from '@/lib/hooks/useBoundStore';


const Accountbar = () => {
  const userInfo = useBoundStore((state)=>state);
  const router = useRouter();
  return (
    <header className="bg-[#27363F] w-full">
      <nav>
        <ul className='flex flex-row justify-around text-base p-2'>
          <li className='w-full'>    <button 
          onClick={()=>{
            router.push('/account')
          }}
          className='
      border-l border-black 
      w-full flex flex-row items-center gap-2 
      px-4 py-2 hover:rounded-lg
      transition-all duration-300 ease-in-out
      hover:scale-110 hover:font-bold 
      hover:shadow-lg hover:shadow-xl/30
      hover:bg-[#DCE0E8]
      focus:outline-none focus:ring-2 focus:ring-blue-400
    '> 
            <img width={24} height={24} alt='Person silouette' src={userInfo.photoURL}/>Cuenta
            </button></li>
          <li className='w-full'>    <button 
          onClick={()=>{
            router.push('/')
          }}
          className='
      border-l border-black 
      w-full flex flex-row items-center gap-2 
      px-4 py-2 hover:rounded-lg
      transition-all duration-300 ease-in-out
      hover:scale-110 hover:font-bold 
      hover:shadow-lg hover:shadow-xl/30
      hover:bg-[#DCE0E8]
      focus:outline-none focus:ring-2 focus:ring-blue-400
    '> 
            <Image width={24} height={24} alt='Gray gear as settings icon' src={SettingsSVG.src}/>Incio
            </button></li>
          <li className='w-full'>    <button 
          onClick={()=>{
            router.push('/ratePage')
          }}
          className='
      border-l border-black 
      w-full flex flex-row items-center gap-2 
      px-4 py-2 hover:rounded-lg
      transition-all duration-300 ease-in-out
      hover:scale-110 hover:font-bold 
      hover:shadow-lg hover:shadow-xl/30
      hover:bg-[#DCE0E8]
      focus:outline-none focus:ring-2 focus:ring-blue-400
    '> 
            <Image width={24} height={24} alt='Bullet point list icon' src={ListSVG.src}/>Comentarios
            </button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Accountbar;