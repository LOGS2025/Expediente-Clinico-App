//import dayjs from "dayjs";
import type { BoundStateCreator } from "@/lib/hooks/useBoundStore";
//import Cookies from 'js-cookie'
import Router from "next/router";
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { Role } from "../utils/types";
import { UserSlice } from "../slices/userSlice";

export const createUserSlice: BoundStateCreator<UserSlice> = (set) => ({
    id_string: "",
    name: "",
    loggedIn: false,
    setName: (name: string) => set(() => ({ name })),
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