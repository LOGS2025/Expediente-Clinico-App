import { User } from "../models/User";

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

export async function getPatientList() {
    try {
        const response = await fetch('/api/supabase/user/getPatients');
        
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
export async function getTelemedicList() {
    try {
        const response = await fetch('/api/supabase/user/getTelemedics');
        
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

export async function getSupervisorList() {
    try {
        const response = await fetch('/api/supabase/user/getSupervisors');
        
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
export async function getUserWithID(user_id: string) {
    try {
        const response = await fetch(`/api/supabase/user/getUser?user_id=${user_id}`);

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
export async function getUserRole(user_id: string) {
    try {
        const response = await fetch(`/api/supabase/user/getRole?user_id=${user_id}`);

        if (!response.ok) {
            console.error("Response not OK:", response.status);
            return null;
        }
        const res = await response.json();
        console.log(res);

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

export async function createUser( {nombre, apellido_p, apellido_m, uuid} : User ) {
    try {
    const response = await fetch(`/api/supabase/user/createUser`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
            body: JSON.stringify({nombre, apellido_p, apellido_m, uuid})
    });
    if (!response.ok) {
        console.error("Response not OK:", response.status);
        return null;
    }
    const res = await response.json();
    console.log(res);
        if (res.success) {
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

export async function createPatient( uuid : string ) {
    try {
    const response = await fetch(`/api/supabase/user/createPatient`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
            body: JSON.stringify(uuid)
    });
    if (!response.ok) {
        console.error("Response not OK:", response.status);
        return null;
    }
    const res = await response.json();
    console.log(res);
        if (res.success) {
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

export async function getUserAppointments(uuid: string) {
    try {
        const response = await fetch(`/api/supabase/appointment/getRoleAppointment?uuid=${uuid}`);

        if (!response.ok) {
            console.error("Response not OK:", response.status);
            return null;
        }
        const res = await response.json();
        console.log(res);

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