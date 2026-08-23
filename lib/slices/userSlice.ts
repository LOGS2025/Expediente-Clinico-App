import { ComponentType } from "react";
import { User } from "../models/User";
import { Role } from "../utils/types";
import { FirebaseLogin } from "../models/FirebaseLogin";

export type UserSlice = {
  // Role is extracted from Database and created the necessary class each login
  // Name is extracted from either DataBase or GoogleAuth options
  user : User | null;
  error: string;
  loggedIn: boolean;
  role: Role;

  displayName: string;
  photoURL: string;
  uid: string;
  token: string;
  email: string;

//  in_video_call: boolean;
  cookieToken?: string | null;
  
  login: ({ email, displayName, photoURL, token, uid }:FirebaseLogin) => Promise<void>;
  logout: () => void;

  setError: (error: string) => void;  
  setCookie: ( cookie: string ) => void;

  getRole: () => Role;
  getID: ()=> string,
  getName: ()=> string,

  getDashboard: ()=> ComponentType | null;
  //joinedAt: dayjs.Dayjs;
};
