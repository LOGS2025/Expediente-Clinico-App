import { ComponentType } from "react";
import { Appointment } from "./Appointment";
import { User } from "./User";
import DashboardLayout from "@/components/dashboard/PatientDashboard";


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
        super(id, email, fullName, 'patient');
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

    /**
     * 
     * @returns The layout to display as dashboard for out Patient user
     */
    getDashboardLayout(): ComponentType {
        return DashboardLayout;
    }
}