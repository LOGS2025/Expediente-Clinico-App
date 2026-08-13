import Sidebar from "@/components/dashboard/Sidebar";
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { ComponentType, useState } from "react";

/**
 *  El dashboard del doctor debe contener 
 *      - una vista de agendas
 *      - navbar
 *      - sidebar
 *      - Cuenta
 */

const DashboardLayout = ()=> {
    const [ActiveItem, setItem] = useState<ComponentType | null >(null);
        
        const user = useBoundStore((state)=>state.user);
        return (
        <>
        {/* Side bar  */}
            <Sidebar 
                ActiveItem={ActiveItem}
                setItem={setItem}
            />
        {/* Side bar selected item */}
        
            {ActiveItem?  (
                <ActiveItem/>
            ) : (
                <>
                </>
            )}
        </>
        )
}


export default DashboardLayout;