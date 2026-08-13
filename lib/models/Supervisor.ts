import { ComponentType } from "react";
import { User } from "./User";
import DashboardLayout from "@/components/dashboard/SupervisorDashboard";


export class Supervisor extends User {
  constructor(
    id: string,
    email: string,
    fullName: string,
    phone: string,
    // Should have appointments?
    //public appointments: string[] = [],
    public personalData: any = {},
    cookieToken: string | null = null,
    loggedIn: boolean = false,
    inVideoCall: boolean = false
  ) {
    super(id, email, fullName, 'supervisor');
  }
  /***********************************
   * On call methods
   ***********************************/
  // Should create call?
  //createCall() {};

  /**
   * 
   * @returns The layout to display as dashboard for out Doctor user
   */
  getDashboardLayout(): ComponentType {
      return DashboardLayout;
  }

}