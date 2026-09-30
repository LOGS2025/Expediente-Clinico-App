'use client'

import { useLayout } from "@/providers/LayoutContext";
import { Inicio } from "../PapimeMsg";
import Link from "next/link";

const SupervisorDashboardLayout = ()=> {
    const { ActiveItem } = useLayout();

    return (
        <div className="
        flex flex-col justify-center 
        bg-white 
        rounded-t-3xl 
        m-5 mb-0 
        p-2
        shadow-[inset_0_5px_4px_rgba(0,0,0,0.08),inset_0_-1px_0_rgba(140,140,140.8)]
        text-black
        ">
            {ActiveItem ? <ActiveItem/> : <Inicio/> }


            <div className="mt-auto p-4">
                {/* 
                    Link to ...
                */}
                <Link className="
                    fixed right-30 bottom-10 w-50
                    py-3 bg-primary text-white rounded-xl border border-blue-400 bg-blue-950
                    font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 flex 
                    items-center justify-center gap-2
                    hover:scale-90 hover:text-blue-300
                "
                href={'www.google.com'}>
                SOLICITAR APOYO
                </Link>
            </div>
        </div>
    )
}

export default SupervisorDashboardLayout;
