
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'patient' | 'supervisor';
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  // Preguntar
}

export interface AuthState {
  user: User | null;
  loggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  isLoading: boolean;
}
