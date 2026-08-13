import { User } from "./User";


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
    super(id, email, fullName);
  }
  /***********************************
   * On call methods
   ***********************************/
  // Should create call?
  //createCall() {};
}