import { AppointmentSlice } from "../models/Appointment";

export async function getUserList() {
    try {
        const response = await fetch('/api/supabase/user/getUserList');
        
        if (!response.ok) {
            console.error("Response not OK:", response.status);
            return null;
        }
        const res = await response.json();
        if (res.ok) {
            return res.data;
        } else {
            console.error("API returned error:", res.mensaje);
            return null;
        }
    } catch (error) {
        console.error("Could not retrieve the information from Supabase: ", error);
        return null;
    }
}

export async function getUserWithID({ user_id }:{ user_id : string}) {
    const response = await fetch(`/api/supabase/user/getUser/${user_id}`);
    await response.json().then((res)=>{
    if (res.ok) {
        console.log(res.data);
    }})
};
