//import dayjs from "dayjs";
import type { BoundStateCreator } from "@/lib/hooks/useBoundStore";
//import Cookies from 'js-cookie'
import { UserSlice } from "../slices/userSlice";
import DoctorDashboardLayout from "@/components/dashboard/user/DoctorDashboard";
import SupervisorDashboardLayout from "@/components/dashboard/user/SupervisorDashboard";
import PatientDashboardLayout from "@/components/dashboard/user/PatientDashboard";
import { FirebaseLogin } from "../models/FirebaseLogin";
import { createUser, getUserRole, getUserWithID } from "../supabase/users";
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
    code?: string;

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
        let user_build : User;
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

            /**
             * User doesnt exist
             */
            let user_build : User;
            if ( data.code == 'PGRST116') 
            {
                console.log("User doesnt exist");
                const name = displayName?.split(' ');
                if ( !name ) throw new Error("No name was given by firebase, possible error");
                console.log(name);
                const res = await createUser({ nombre: name[0], apellido_p: name[1], apellido_m: name[2], uuid:uid })
                if ( !res ) throw new Error("User wasn't able to be created!");
                
                user_build = {
                    nombre: name[0],
                    apellido_p: name[1],
                    apellido_m: name[2],
                    uuid: uid
                }
                
            } 
            else if ( !data ) // no data was returned
                throw new Error("No information received from database");
            // If code wasn't non existant user and we got data then build upon it
            else 
            {
                user_build = {
                    nombre: data.nombre,
                    apellido_p: data.apellido_p,
                    apellido_m: data.apellido_m,
                    uuid: data.uuid
                }
            }
            if ( !user_build ) throw new Error("User object couldn't be built");
            /**
             * Now that the user does exist, look for him on other tables.
             */
            const roleJoinsData : any = await getUserRole(uid);
            console.log(roleJoinsData);

            if ( roleJoinsData.paciente )
                set({ role: 'patient' });
            else if ( roleJoinsData.supervisor )
                set({ role: 'supervisor' });
            else if ( roleJoinsData.telemedico )
                set({ role: 'doctor' });
            else 
                set({ role: 'indefinido' });

            console.log(`Logged user in as ${get().role}`)
            set({   loggedIn: true,
                    user: user_build
                });

        } catch ( err ) {
            console.error(err);
        }
    },

    logout: () => {
        set({loggedIn: false})
        console.log("Set logged in as false");
    },

    setCookie: ( cookie: string ) => {
        set({cookieToken: cookie});
    },

    setError: (error) => set({ error }),

    getRole: () => get().role,

    getID: ()=> {
        const user = get().user;
        if ( user?.uuid ) return user.uuid;
        else return '';
    },

    getName: ()=> {
        const user = get().user;
        if ( user?.uuid ) return user.uuid;
        else return '';
    },

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