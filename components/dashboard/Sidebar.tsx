'use client';

import { useLayout } from "@/providers/LayoutContext";
import { useExpedienteClinicoItems, useSideBarItems } from "@/lib/utils/index";
import { useState } from "react";


const Sidebar = ()=> {
    const sidebarItems = useSideBarItems();
    const expClinicoItems = useExpedienteClinicoItems();
    const [display, setDisplay ] = useState<boolean>(false);
    const { ActiveItem, setItem } = useLayout();

    return (
    <aside className="flex flex-col h-full left-0 bg-blue-950 gap-6 p-4">
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
                                setItem(null);
                            } else {
                                setItem(item.component); 
                            }
                        } }
                        className="w-full p-5 bg-blue-950 py-3 bg-primary text-gray-300 font-light rounded-xl text-xs uppercase tracking-widest 
                        gap-2 hover:text-white hover:font-bold transition-all
                        ">
          <span className="material-symbols-outlined text-sm">{item.name}</span>
                        </button>
                    </span>
                )
            })}

        <div className="flex flex-col w-full">
            {/* Main Button - Toggle */}
            <button 
            onClick={() => setDisplay(!display)}
            className="w-full p-5 bg-blue-950 py-3 bg-primary text-gray-300 font-light rounded-xl text-xs uppercase tracking-widest 
                        gap-2 hover:text-white hover:font-bold transition-all
            ">
            <span>Expediente Clínico</span>
            </button>

            {/* Dropdown Menu */}
            <div 
            className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${display ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}
            `}
            >
                <div className="flex flex-col gap-8">
                    {expClinicoItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setItem(item.component)}
                        className={`w-full p-5 bg-blue-950 rounded-2xl font-light 
                            text-sm hover:text-white hover:font-bold
                            `}
                    >
                        <span className="">{item.name}</span>
                    </button>
                    ))}
                </div>
            </div>
        </div>
        </nav>

        <div className="mt-auto p-4">
            <button className="w-full py-3 bg-primary text-white rounded-xl 
            font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2" >
            SOLICITAR APOYO
            </button>
        </div>

    </aside>
    )
}

export default Sidebar;


