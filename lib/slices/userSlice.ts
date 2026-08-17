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
  
  login: (userData : User) => void;
  logout: () => void;
  setError: (error: string) => void;  

  getRole: () => Role | undefined;
  getID: ()=> string | undefined,
  getName: ()=> string | undefined,

  getDashboard: ()=> ComponentType | null;
  //joinedAt: dayjs.Dayjs;
};
