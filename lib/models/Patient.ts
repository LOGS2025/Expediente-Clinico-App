import { Appointment } from "./Appointment";
import { User } from "./User";


export class Patient extends User {
    constructor(
        id: string,
        email: string,
        fullName: string,
        phone: string,
        sensorData: string = '',
        sensorMeasurements: string = '',
        appointment: Appointment,
        public personalData: any = {},
        cookieToken: string | null = null,
        loggedIn: boolean = false,
        inVideoCall: boolean = false
    ) {
        super(id, email, fullName);
    };
    
    // getDashboardLayout(): React.ReactNode {
    //     return <>
    // };
    // getVideoCallLayout(): React.ReactNode {
    //     return <>
    // };

    /***********************************
     * On call methods
    ***********************************/
    sendSensorData() {};
}