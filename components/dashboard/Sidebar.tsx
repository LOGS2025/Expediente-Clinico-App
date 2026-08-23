'use client';

import { useExpedienteClinicoItems, useSideBarItems } from "@/lib/utils/index";
import { ComponentType, useState } from "react";


const Sidebar = ({ActiveItem, setItem}:{ActiveItem : ComponentType | null; setItem: React.Dispatch<any>})=> {
    const sidebarItems = useSideBarItems();
    const expClinicoItems = useExpedienteClinicoItems();
    const [display, setDisplay ] = useState<boolean>(false);

    return (
    <aside className="flex flex-col h-dvh fixed w-[200px] left-0 bg-blue-400 gap-6 p-4">
        <div className="mb-8 px-2">
        <h2 className="font-['Manrope'] font-bold text-blue-900 dark:text-blue-100 text-lg" >Biblioteca</h2>
        <p className="text-xs text-slate-500" >Recursos de teleaprendizaje</p>
        </div>
      
        {/*  Loop for each sidebar item and its attributes */}
        <nav className="flex flex-col gap-24">
            {sidebarItems.map((item) => {
                return (
                    <span key={item.name}>
                        <button 
                        onClick={()=>{
                            if ( ActiveItem == item.component ) {
                                setItem(() => null );
                            } else {
                                setItem(() => item.component); 
                            }
                        } }
                        className="w-full bg-blue-600 py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest 
                        shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
          <span className="material-symbols-outlined text-sm">{item.name}</span>
                        </button>
                    </span>
                )
            })}

        <div className="flex flex-col w-full">
            {/* Main Button - Toggle */}
            <button 
            onClick={() => setDisplay(!display)}
            className="group relative w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
            >
            <span>Expediente Clínico</span>
            </button>

            {/* Dropdown Menu */}
            <div 
            className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${display ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}
            `}
            >
            <div className="grid grid-cols-1 gap-1.5 p-2 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-blue-100 dark:border-blue-800/30 backdrop-blur-sm">
                {expClinicoItems.map((item) => (
                <button
                    key={item.name}
                    onClick={() => setItem(()=>item.component)}
                    className={`
                    relative w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200
                    flex items-center gap-3 overflow-hidden
                    ${ActiveItem === item.component
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:shadow-md'
                    }
                    `}
                >
                    {/* Name */}
                    <span className="flex-1 text-left">{item.name}</span>
                    {/* Hover arrow */}
                    {ActiveItem !== item.component && (
                    <span className="material-symbols-outlined text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        chevron_right
                    </span>
                    )}
                </button>
                ))}
            </div>
            </div>
        </div>
            
        </nav>

        <div className="mt-auto p-4">
            <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2" >
            SOLICITAR APOYO
            </button>
        </div>

    </aside>
    )
}

export default Sidebar;


