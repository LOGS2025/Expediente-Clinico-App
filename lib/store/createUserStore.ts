//import dayjs from "dayjs";
import type { BoundStateCreator } from "@/lib/hooks/useBoundStore";
//import Cookies from 'js-cookie'
import { UserSlice } from "../slices/userSlice";
import DoctorDashboardLayout from "@/components/dashboard/user/DoctorDashboard";
import SupervisorDashboardLayout from "@/components/dashboard/user/SupervisorDashboard";
import PatientDashboardLayout from "@/components/dashboard/user/PatientDashboard";
import { FirebaseLogin } from "../models/FirebaseLogin";
import { getUserWithID } from "../supabase/users";
import { User } from "../models/User";

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

interface UserFromSupabase {
    uuid: string;
    nombre: string;
    apellido_p : string;
    apellido_m : string;

    id: number;
    creacion: string;

    paciente: User | null;
    telemedico: User | null;
    supervisor: User | null;
}

export const createUserSlice: BoundStateCreator<UserSlice> = (set, get) => ({
    user: null,
    error: 'None',
    loggedIn: false,
    cookieToken: null,
    role: 'indefinido',

    displayName: '',
    photoURL: '',
    uid: '',
    token: '',
    email: '',


    login: async ({ email, displayName, photoURL, token, uid }:FirebaseLogin) => {
        try {// Save out firebase info
            set({
                email: email || '',
                displayName: displayName || '',
                photoURL: photoURL || '',
                token: token,
                uid: uid
            });

            // fetch user data from db with the uid we received
            const data : UserFromSupabase = await getUserWithID(uid);

            if ( data ) {
                const user_build : User = {
                    nombre: data.nombre,
                    apellido_p: data.apellido_p,
                    apellido_m: data.apellido_m,
                    uuid: data.uuid
                }

                if ( data.paciente )
                    set({ role: 'patient' })
                if ( data.supervisor )
                    set({ role: 'supervisor' })
                if ( data.telemedico )
                    set({ role: 'doctor' })

                set({   loggedIn: true,
                        user: user_build
                    });
            }
        } catch ( err ) {
            console.error(err);
        }
    },

    logout() { set({loggedIn: false}) },

    setCookie: ( cookie: string ) => {
        set({cookieToken: cookie});
    },

    setError: (error) => set({ error }),

    getRole: () => get().role,
    getID: ()=> get().uid,
    getName: ()=> get().user?.nombre,

    getDashboard: ()=> {
        const role = get().role;
        return layoutMap[role];
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