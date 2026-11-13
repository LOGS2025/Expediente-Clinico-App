import { ComponentType } from "react";
import { User } from "../models/User";
import { Role } from "../utils/types";
import { FirebaseLogin } from "../models/FirebaseLogin";

// lib/slices/userSlice.ts
export type CallStatus =
  | 'idle'          // nothing happened yet
  | 'loading'       // creating / fetching the call
  | 'ready'         // call exists, lobby shown
  | 'joining'       // join() in progress
  | 'joined'        // in the call
  | 'leaving'       // leave() in progress
  | 'left'          // left, call torn down
  | 'error';

export type UserSlice = {
  // Role is extracted from Database and created the necessary class each login
  // Name is extracted from either DataBase or GoogleAuth options
  user : User | null;
  error: string;
  loggedIn: boolean;
  role: Role;
  
  callStatus: CallStatus;

  displayName: string;
  photoURL: string;
  uid: string;
  token: string;
  email: string;

  has_call : boolean;
  has_client : boolean;

  cookieToken?: string | null;
  
  login: ({ email, displayName, photoURL, token, uid }:FirebaseLogin) => Promise<void>;
  logout: () => void;

  setError: (error: string) => void;  
  setCookie: ( cookie: string ) => void;

  getRole: () => Role;
  getName: ()=> string,
  getID: ()=> string,

  getDashboard: ()=> ComponentType | null;

  setJoined:    (status : boolean)=> void;
  setHasClient: (status : boolean)=> void;

  setCallStatus: (status: CallStatus) => void;
  // optional helpers

  resetCall: () => void;
  markLoading: () => void;
  markReady: () => void;
  markJoining: () => void;
  markJoined: () => void;
  markLeaving: () => void;
  markLeft: () => void;
  markError: (message: string) => void;
};
