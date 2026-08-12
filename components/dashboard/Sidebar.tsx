'use client';

import Link from "next/link";

/*
    Move to a more general file
*/
export type Tab = "" | "" | "" ;

const Sidebar = ({ selectedTab }: { selectedTab: Tab | null })=> {
    return (
    <aside className="fixed left-0 top-[18%] bottom-[15%] w-[20%] flex flex-col p-4 z-40 bg-slate-100 dark:bg-slate-950 font-['Inter'] text-sm font-medium">
        <div className="mb-8 px-2">
        <h2 className="font-['Manrope'] font-bold text-blue-900 dark:text-blue-100 text-lg" >Biblioteca</h2>
        <p className="text-xs text-slate-500" >Recursos de teleaprendizaje</p>
        </div>
            <nav className="flex flex-col gap-2">
                {sidebarItems.map((item) => {
                    return (
                    <li key={item.ref} className="">
                        {item.name === selectedTab ? (
                            <Link
                            href={item.href}
                            className=""
                            >
                            {item.icon}{" "}
                            <span></span>
                            </Link>
                        ) : (
                            <Link
                            href={item.href}
                            className=""
                            >
                            {item.icon}{" "}
                            <span></span>
                            </Link>
                        )}
                    </li>
                    )
                })}
            <a className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 rounded-l-xl font-bold shadow-sm transition-all" href="#" >Historia Clínica</a>
            <a className="flex items-center gap-3 p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-l-xl transition-all" href="#" >Paraclínicos</a>
            <a className="flex items-center gap-3 p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-l-xl transition-all" href="#" >Agenda</a>
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