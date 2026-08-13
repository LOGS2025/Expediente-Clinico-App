//import dayjs from "dayjs";
import type { BoundStateCreator } from "@/lib/hooks/useBoundStore";
//import Cookies from 'js-cookie'
import Router from "next/router";
import { UserSlice } from "../slices/userSlice";
import { createUser } from "../models/UserCreate";
import router from "next/router";

/*
 *  The website should recognize the role by fetching it from the db? 
 *  Since you cant create accounts on the website?
 */


export const createUserSlice: BoundStateCreator<UserSlice> = (set, get) => ({
    user: null,
    error: null,
    loggedIn: false,

    login: async (userData: any) => {
        try {
            const user = createUser(userData);

            set({
                user, 
                loggedIn: true,
                error: null
            });
        } catch(error) {
            console.log(error);
        }
    },

    logout() {
            
    },

    setUser: (user) => set({ user, loggedIn: true }),
    setError: (error) => set({ error }),

    getRole: () => get().user?.role || null,
    isDoctor: () => get().user?.role === 'doctor',
    isPatient: () => get().user?.role === 'patient',
    isSupervisor: () => get().user?.role === 'supervisor',
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