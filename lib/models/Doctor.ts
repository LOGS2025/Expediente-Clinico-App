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
    inVideoCall: boolean = false
  ) {
    super(id, email, fullName, 'doctor');
  }

  // @param patient
  // @param date
  // @param ...
  createClinicalRecord() {}; // Only on call?

  /***********************************
   * On call methods
   ***********************************/
  createCall() {};
  // Display where the sensor should be placed
  // once the call has started
  displayGraph() {};
}
