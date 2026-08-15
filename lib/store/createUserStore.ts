//import dayjs from "dayjs";
import type { BoundStateCreator } from "@/lib/hooks/useBoundStore";
//import Cookies from 'js-cookie'
import { UserSlice } from "../slices/userSlice";
import { User } from "../models/User";
import DoctorDashboardLayout from "@/components/dashboard/user/DoctorDashboard";
import SupervisorDashboardLayout from "@/components/dashboard/user/SupervisorDashboard";
import PatientDashboardLayout from "@/components/dashboard/user/PatientDashboard";
import { Role } from "../utils/types";

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

interface UserData {
    id_string: string;
    name: string;
    email: string;
    phone?: string;
    role: Role;
}

export const createUserSlice: BoundStateCreator<UserSlice> = (set, get) => ({
    user: null,
    error: 'None',
    loggedIn: false,

    login: async (userData: UserData) => {
        try {
            const user: User = {
                id_string: userData.id_string,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,

                role: userData.role,
            }

            set({
                user, 
                loggedIn: true,
            });
        } catch(error) {
            console.log(error);
        }
    },

    logout() {},

    setUser: (user) => set({ user, loggedIn: true }),
    setError: (error) => set({ error }),

    getRole: () => get().user.role,
    getID: ()=> get().user.id_string,
    getName: ()=> get().user.name,

    isDoctor: () => get().user?.role === 'doctor',
    isPatient: () => get().user?.role === 'patient',
    isSupervisor: () => get().user?.role === 'supervisor',

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