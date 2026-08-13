'use client'

import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { ComponentType, useEffect, useState } from "react";

/*
    Navbar deberia mostrar cuenta, accede a user?

Dashboard 
    funcion :
        Iniciar videocall
        Crear cita
    componentes :
        Calendario
        Citas dashboard
*/

const Home = ()=> {
    const user = useBoundStore((state)=>state.user);
    const [Dashboard, setDashboard] = useState<ComponentType | null >(null);

    useEffect(()=>{
        if ( user ) {
            console.log(user);
            const Component = user.Dashboard;
            setDashboard(() => Component);
        }
    }, [user]);

    if (!Dashboard) {
        return (
            <>
                No hay dashboard
            </>
        )
    }

    return <Dashboard/>

}

export default Home;