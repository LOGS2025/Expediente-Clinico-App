import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
import { Supervisor } from "./Supervisor";
import { User } from "./User";

export const createUser = (data: any): User => {
    switch (data.role) {
      case 'doctor':
        return new Doctor(
            data.id,
            data.email,
            data.fullName,
            data.phone,
            data.appointments,
            data.personalData,
            data.cookieToken,
            data.loggedIn,
            data.inVideoCall,
        );
      case 'patient':
        return new Patient(
            data.id,
            data.email,
            data.fullName,
            data.phone,
            data.sensorData,
            data.sensorMeasurements,
            data.appointment,
            data.personalData,
            data.cookieToken,
            data.loggedIn,
            data.inVideoCall
        );
      case 'supervisor':
        return new Supervisor(
            data.id,
            data.email,
            data.fullName,
            data.phone,
            data.personalData,
            data.cookieToken,
            data.loggedIn,
            data.inVideoCall,
        );
      default:
        throw new Error(`Unknown user role: ${data.role}`);
    }
}