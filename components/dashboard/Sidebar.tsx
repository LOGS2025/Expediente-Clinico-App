'use client';

import { useSideBarItems } from "@/lib/utils/index";
import { ComponentType } from "react";


const Sidebar = ({
    ActiveItem, 
    setItem
} : {
    ActiveItem: ComponentType | null;
        setItem: React.Dispatch<any>;
})=> {
    const sidebarItems = useSideBarItems();
    return (
    <aside className="fixed left-0 top-[18%] bottom-[15%] w-[20%] flex flex-col p-4 z-40 bg-slate-100 dark:bg-slate-950 font-['Inter'] text-sm font-medium">
        <div className="mb-8 px-2">
        <h2 className="font-['Manrope'] font-bold text-blue-900 dark:text-blue-100 text-lg" >Biblioteca</h2>
        <p className="text-xs text-slate-500" >Recursos de teleaprendizaje</p>
        </div>
      
        {/*  Loop for each sidebar item and its attributes */}
        <nav className="flex flex-col gap-2">
            {sidebarItems.map((item) => {
                return (
                    <li key={item.name} className="">
                        <button 
                        onClick={()=>{ setItem(() => item.component) } }
                        className="w-full py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
          <span className="material-symbols-outlined text-sm">{item.name}</span>
                        </button>
                    </li>
                )
            })}
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
