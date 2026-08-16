import { AppointmentToSupabase } from "../models/Appointment";

export async function getAppointmentWithID( appointment_id : string ) {
    const response = await fetch(`/api/supabase/appointment/getAppointment/${appointment_id}`);
    await response.json().then((res)=>{
    if (res.ok) {
        console.log(res.data);
    }})    
}
export async function getAppointmentList() {
    try {
        const response = await fetch('/api/supabase/appointment/getAppointmentList');
        
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
export async function deleteAppointmentWithId() {}
export async function modifyAppointmentWithId() {}

export async function createAppointment( appointmentData : AppointmentToSupabase) {
    try {
    const response = await fetch(`/api/supabase/appointment/createAppointment`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
            body: JSON.stringify(appointmentData)
    });
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
