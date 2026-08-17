//import dayjs from "dayjs";
import type { BoundStateCreator } from "@/lib/hooks/useBoundStore";
//import Cookies from 'js-cookie'
import { UserSlice } from "../slices/userSlice";
import { User } from "../models/User";
import DoctorDashboardLayout from "@/components/dashboard/user/DoctorDashboard";
import SupervisorDashboardLayout from "@/components/dashboard/user/SupervisorDashboard";
import PatientDashboardLayout from "@/components/dashboard/user/PatientDashboard";
import { Role } from "../utils/types";
import { use } from "react";

/*
 *  The website should recognize the role by fetching it from the db? 
 *  Since you cant create accounts on the website?
 */
const layoutMap = {
    'doctor' : DoctorDashboardLayout,
    'supervisor' : SupervisorDashboardLayout,
    'patient' : PatientDashboardLayout,
    'indefinido' : null
} as const;


export const createUserSlice: BoundStateCreator<UserSlice> = (set, get) => ({
    user: null,
    error: 'None',
    loggedIn: false,

    login: ({user_id, nombre, apellido_p, apellido_m, email, phone, role}:User) => {
        if ( !user_id || !nombre || !role ) {
            set({ error: 'No se pasaron los datos' });
            return;
        }
        try {
            const user: User = {
                user_id: user_id,
                nombre: nombre,
                apellido_p: apellido_p,
                apellido_m: apellido_m,
                email: email,
                phone: phone,
                role: role,
            }

            console.log(user);

            set({
                user, 
                loggedIn: true,
            });
        } catch(error) {
            console.log(error);
        }
    },

    logout() {},

    setError: (error) => set({ error }),

    getRole: () => get().user?.role,
    getID: ()=> get().user?.user_id,
    getName: ()=> get().user?.nombre,

    getDashboard: ()=> {
        const user = get().user;
        if ( !user ) return null;
        return layoutMap[user.role];
    }
})


//   logIn: async(authToken: string,) =>  {
//     Cookies.set('token',authToken, { expires : 1 });    
//     set(() => ({ loggedIn: true }))
//     const cookies = Cookies.get('token');
//   },
    
//   logOut: () => {
//     const router = Router.router
//     Cookies.remove('token');    
//     console.log(localStorage)
//     useBoundStore.persist.clearStorage();
//     useBoundStore.persist.rehydrate();
//     localStorage.clear();
//     localStorage.removeItem('bound-storage');
//     router?.push('/')
//     set(() => ({ loggedIn: false }))},