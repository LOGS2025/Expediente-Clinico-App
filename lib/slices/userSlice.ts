import { ComponentType } from "react";
import { User } from "../models/User";
import { Role } from "../utils/types";

export type UserSlice = {
  // Role is extracted from Database and created the necessary class each login
  // Name is extracted from either DataBase or GoogleAuth options
  // ID is extracted from Database
  user : User | null;
  error: string;
  loggedIn: boolean;

//  in_video_call: boolean;
//  cookieToken?: string | null;
  
  login: (userData : any) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setError: (error: string) => void;  

  getRole: () => Role;
  getID: ()=> string,
  getName: ()=> string,

  isDoctor: () => boolean;
  isPatient: () => boolean;
  isSupervisor: () => boolean;
  getDashboard: ()=> ComponentType | null;
  //joinedAt: dayjs.Dayjs;
};
