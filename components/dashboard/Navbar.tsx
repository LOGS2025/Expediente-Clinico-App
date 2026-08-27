// components/layout/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTopBarItems } from "@/lib/utils";
import { Top } from "@/lib/utils/barItems";
import { useBoundStore } from '@/lib/hooks/useBoundStore';

interface NavbarProps {
  selectedTab?: Top | null;
}

const Navbar = ({ selectedTab = null }: NavbarProps) => {
  const topbarItems = useTopBarItems();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userInfo = useBoundStore((state)=>state);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[120px]">
          {/* Logo Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <img 
              className=" fixed w-[100px] h-auto object-contain left-0" 
              src="/logoUnam.png" 
              alt="Logo UNAM" 
            />
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold text-blue-800 dark:text-blue-400 leading-tight font-['Manrope']">
                Sistema ECE Didáctico
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Facultad de Medicina · UNAM
              </p>
              <span>Logged in as {userInfo.getRole()}</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {topbarItems.map((item) => {
              const isActive = pathname === item.href || item.name === selectedTab;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    flex items-center gap-2
                    ${isActive 
                      ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}
        `}>
          <nav className="flex flex-col gap-1">
            {topbarItems.map((item) => {
              const isActive = pathname === item.href || item.name === selectedTab;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    flex items-center gap-3
                    ${isActive 
                      ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;