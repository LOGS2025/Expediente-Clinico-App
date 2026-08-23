'use client';

import { useSideBarItems } from "@/lib/utils/index";
import { ComponentType, useState } from "react";


const Sidebar = ({
    ActiveItem, 
    setItem,
    displayHistClin,
    setDisplayHistClin,
} : {
    ActiveItem: ComponentType | null;
        setItem: React.Dispatch<any>;
        displayHistClin: boolean;
        setDisplayHistClin: React.Dispatch<any>;
})=> {
    const sidebarItems = useSideBarItems();
    const [display, setDisplay] = useState<boolean>(false);

    return (
    <aside className="flex flex-col h-dvh fixed w-[200px] bg-blue-400 gap-6 p-4">
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
                        onClick={()=>{ setItem(() => item.component) } }
                        className="w-full bg-blue-600 py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest 
                        shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
          <span className="material-symbols-outlined text-sm">{item.name}</span>
                        </button>
                    </span>
                )
            })}
            
            <button 
                onClick={()=>{ setDisplay(!display) } }
                className="flex flex-col w-full py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                    <span className="material-symbols-outlined text-sm">Expediente clinico</span>
            </button>
            {   display ? (
                <div className="flex flex-col">
                    <button onClick={()=>{ setDisplayHistClin(!displayHistClin) }}>Historia Clinica</button>
                    <button>Nota SOAP</button>
                </div>
            ) : (
                <></>
            )}

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
