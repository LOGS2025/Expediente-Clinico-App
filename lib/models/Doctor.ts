import { ComponentType } from "react";
import { User } from "./User";

export class Doctor extends User {
  constructor(
    id: string,
    email: string,
    fullName: string,
    phone: string,
    public appointments: string[] = [],
    public personalData: any = {},
    cookieToken: string | null = null,
    loggedIn: boolean = false,
    inVideoCall: boolean = false,
    Dashboard: ComponentType
  ) {
    super(id, email, fullName, 'doctor');
  }
}
