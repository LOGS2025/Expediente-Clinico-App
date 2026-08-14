'use client'

import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { ComponentType, useEffect, useState } from "react";

const Home = ()=> {
    // Also use user to display the account
    const user = useBoundStore((state)=>state.user);
    const getDashboard = useBoundStore((state)=>state.getDashboard)
    const [Dashboard, setDashboard] = useState<ComponentType | null >(null);

    useEffect(()=>{
        if ( user ) {
            console.log(user);
            const Component = getDashboard();
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