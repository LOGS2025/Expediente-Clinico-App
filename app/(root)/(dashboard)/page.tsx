'use client'

import { Calendar } from "@/components/ui/Calendar";
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import dayjs from "dayjs";
import { useState } from "react";



const Home = ()=> {
    const [now, setNow] = useState(dayjs());
    const user = useBoundStore((state)=>state.user);
    return (
        <>
            <span>{user?.role}</span>
            <span>{}</span>
        </>
    )
}

export default Home;


{/* <Calendar
    now={now}
    setNow={setNow}
    examDay={dayjs('2026-4-10')}/> */}