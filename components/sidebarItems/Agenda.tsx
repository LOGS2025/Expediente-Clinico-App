import { useState } from "react";
import { Calendar } from "../ui/Calendar";
import dayjs from "dayjs";

const Agenda = ()=> {
    const [now, setNow] = useState(dayjs());

    return (
        <>
        <Calendar
            now={now}
            setNow={setNow}
            examDay={dayjs('2026-4-10')}/>
        </>
    )
}

export default Agenda;