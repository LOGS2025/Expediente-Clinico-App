
'use client'

import { Participant } from "@/lib/models/User";
import { getPatientList, getSupervisorList, getTelemedicList } from "@/lib/supabase/users";
import { useEffect, useState } from "react";

/**
 * @param param0 Participant list filled with user information
 * 
 * UI Function for these page
 */
const CommentBox = ({
    personList
}:{
    personList : [Participant] | undefined
})=>{
    return (
        <div>
            <div className="h-[100px]">
              {personList && personList.map((person) => {
                return (
                    <button key={person.usuario.uuid}>
                        <span>{person.usuario.nombre} {person.usuario.apellido_p} {person.usuario.apellido_m}</span>
                    </button>
                )
              })}  
            </div>
        </div>
    )
}

const RatePage = ()=>{
    const [patients   , setPatients   ]   = useState<[Participant]>();
    const [telemedics , setTelemedics ]   = useState<[Participant]>();
    const [supervisors, setSupervisors]   = useState<[Participant]>();

    const [target, setTarget] = useState<Participant | undefined>();

    useEffect(()=>{
        const getAll = async ()=>{
            const supervisors   : [Participant] = await getSupervisorList();
            const patients      : [Participant] = await getPatientList();
            const telemedics    : [Participant] = await getSupervisorList();

            if ( patients )     setPatients(patients);
            if ( telemedics )   setTelemedics(telemedics);
            if ( supervisors )  setSupervisors(supervisors);
        }
        getAll();
    },[])

    return (
        <div className="h-fit text-blue-950">
            <CommentBox personList={patients}/>
            <CommentBox personList={telemedics}/>
            <CommentBox personList={supervisors}/>
        </div>
    )
}

export default RatePage;


