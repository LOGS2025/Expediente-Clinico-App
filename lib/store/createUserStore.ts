//import dayjs from "dayjs";
import type { BoundStateCreator } from "@/lib/hooks/useBoundStore";
//import Cookies from 'js-cookie'
import { UserSlice } from "../slices/userSlice";
import DoctorDashboardLayout from "@/components/dashboard/user/DoctorDashboard";
import SupervisorDashboardLayout from "@/components/dashboard/user/SupervisorDashboard";
import PatientDashboardLayout from "@/components/dashboard/user/PatientDashboard";
import { FirebaseLogin } from "../models/FirebaseLogin";
import { getUserWithID } from "../supabase/users";

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
    cookieToken: null,
    role: 'indefinido',

    displayName: '',
    photoURL: '',
    uid: '',
    token: '',
    email: '',


    login: async ({ email, displayName, photoURL, token, uid }:FirebaseLogin) => {
        // Save out firebase info
        set({
            email: email || '',
            displayName: displayName || '',
            photoURL: photoURL || '',
            token: token,
            uid: uid
        });

        // fetch user data from db with the uid we received
        const data = await getUserWithID(uid);
        console.log(data);
    },

    logout() {},

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