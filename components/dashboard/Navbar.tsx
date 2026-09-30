// components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTopBarItems } from "@/lib/utils";
import { Top } from "@/lib/utils/barItems";
import { useBoundStore } from '@/lib/hooks/useBoundStore';
import { logo_without_bg, FacmedLogo, hamburgerMenuSVG } from '@/assets/images';
import Image from 'next/image';
import { SVGProps } from 'react';
import { JSX } from 'react/jsx-runtime';

interface NavbarProps {
  selectedTab?: Top | null;
}

// bg-[#002E6D]

const Navbar = ({ selectedTab = null }: NavbarProps) => {
  const topbarItems = useTopBarItems();
  const pathname = usePathname();

return (
  <header className="
    top-0 left-0 right-0
    backdrop-blur-xl
    shadow-sm
    w-full
    bg-gradient-to-l from-white via-white to-[#002E6D]
  ">
    <div className="flex flex-row w-full">
      <div className="flex h-[120px] w-full">
        <div className="flex items-center gap-3 flex-shrink-0">
          <img
            src={logo_without_bg.src}
            className="pl-5 w-auto h-[30%] object-contain left-0"
            alt="Logo UNAM"
          />
          <img
            src={FacmedLogo.src}
            className="w-auto h-[30%] object-contain left-0"
            alt="Logo Facultad de Medicina"
          />

          <div className="items-start">
            <h1 className="text-sm font-bold text-blue-800 dark:text-blue-400 leading-tight font-['Manrope']">
              Sistema ECE Didáctico
            </h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              Facultad de Medicina · UNAM
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>
);
};

export default Navbar;


const HamburgerMenu = () => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 122.88 95.95"
      xmlSpace="preserve"
    >
      <g>
        <path
          style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
          fill="currentColor"
          d="M8.94,0h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,17.88,0,13.86,0,8.94l0,0 C0,4.02,4.02,0,8.94,0L8.94,0z M8.94,78.07h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105 C4.02,95.95,0,91.93,0,87.01l0,0C0,82.09,4.02,78.07,8.94,78.07L8.94,78.07z M8.94,39.03h105c4.92,0,8.94,4.02,8.94,8.94l0,0 c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,56.91,0,52.89,0,47.97l0,0C0,43.06,4.02,39.03,8.94,39.03L8.94,39.03z"
        />
      </g>
    </svg>
  );
};