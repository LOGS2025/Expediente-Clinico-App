import Sidebar from "@/components/dashboard/Sidebar";
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { Patient } from "@/lib/models/Patient";
import { ComponentType, useState } from "react";

/**
 *  El dashboard del doctor debe contener 
 *      - una vista de agendas
 *      - navbar
 *      - sidebar
 *      - Cuenta
 */

export interface Appointment {
    Date: string,
    Patient: Patient,
    
}


const DoctorDashboardLayout = ()=> {
    const [ActiveItem, setItem] = useState<ComponentType | null >(null);
    const user = useBoundStore((state)=>state.user);

    return (
        <div className="flex ">
            {/* Side bar  */}
            <div className="flex-1">
                <Sidebar 
                    ActiveItem={ActiveItem}
                    setItem={setItem}
                />
            </div>

            <div className="flex-4">
                {/* Side bar selected item */}
                {ActiveItem?  (
                    <ActiveItem/>
                ) : (
                    <>
                    </>
                )}
                {/* On the same flex, place our db 
                information panel for appointments */}

            
            </div>
            
        </div>
    )
}


export default DoctorDashboardLayout;