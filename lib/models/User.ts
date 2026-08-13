import { ComponentType } from "react";
import { Role } from "../utils/types";
import DoctorDashboardLayout from "@/components/dashboard/DoctorDashboard";
import SupervisorDashboardLayout from "@/components/dashboard/SupervisorDashboard";
import PatientDashboardLayout from "@/components/dashboard/PatientDashboard";

export abstract class User {
    // Private as the method should be responsible for using it
    // to be displayed on videocall
    private id_string: string;
    // Private as the method should be responsible for using it
    // to be displayed on videocall
    private name: string;
    // Private as the method should be responsible for using it
    // to be displayed on videocall
    private email: string;
    private phone: string = "";
    // Public for ease of access throughout the app?
    public logged_in: boolean = false;
    public in_video_call: boolean = false;

    public cookieToken: string | null = null;
    public role : Role;

    public Dashboard: ComponentType | null;

    constructor(id_string:string, name:string, email:string, role : Role) {
        this.id_string = id_string;
        this.name = name;
        this.email = email;
        this.role = role;

        switch (role) {
            case 'doctor':
                this.Dashboard = DoctorDashboardLayout;
                break;
            case 'supervisor':
                this.Dashboard = SupervisorDashboardLayout;
                break;
            case 'patient':
                this.Dashboard = PatientDashboardLayout;
                break;
            default:
                this.Dashboard = null;
                break;
        }
    }
}

