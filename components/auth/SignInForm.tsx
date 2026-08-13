'use client';

import { useState } from 'react';
import { useBoundStore } from '@/lib/hooks/useBoundStore';
import { useRouter } from 'next/navigation';

/*
 *  Should only expect an email and a password assuing the account creation 
 *  is done manually for each user 
 */

const doctData = {
    id: '0110917152',
    email: 'doc@gmail.com',
    fullName: 'pepe toro',
    phone: '0000000000',
    role: 'doctor',
    appointments: 0,
    personalData: null,
    cookieToken: null,
    loggedIn: false,
    inVideoCall: false,
}
const supData = {
    id: '0110917152',
    email: 'sup@gmail.com',
    fullName: 'juanito gonzalez',
    phone: '0000000000',
    role: 'supervisor',
    appointments: 0,
    personalData: null,
    cookieToken: null,
    loggedIn: false,
    inVideoCall: false,
}
const patientData = {
    id: '0110917152',
    email: 'patient@gmail.com',
    fullName: 'diego mercante',
    phone: '0000000000',
    role: 'patient',
    appointments: 0,
    personalData: null,
    cookieToken: null,
    loggedIn: false,
    inVideoCall: false,
}


export const SignInForm = () => {
  const router = useRouter();
  const login = useBoundStore((state) => state.login);
  const user = useBoundStore((state)=>state.user);
  const error = useBoundStore((state) => state.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
    return;
    }
    
    try {
        // We fetch the data, but while there is no backend we compare
        if ( email == 'doc@gmail.com' && password == '123' ) {
            await login(doctData);
            router.push('/');
        } 
        else if ( email == 'sup@gmail.com' && password == '123' ) {
            await login(supData);
            router.push('/');
        } 
        else if ( email == 'patient@gmail.com' && password == '123' ) {
            await login(patientData);
            router.push('/');
        }
        
    } catch (err) {
        // Error is handled in the store
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <span className="material-symbols-outlined text-3xl text-primary">
            account_circle
          </span>
        </div>
        <h2 className="text-2xl font-bold text-on-surface">Bienvenido</h2>
        <p className="text-sm text-on-surface-variant mt-2">
          Ingresa tus credenciales para acceder al sistema
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-1">
          <label 
            htmlFor="email" 
            className="text-sm font-medium text-on-surface-variant"
          >
            Correo Electrónico
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            </span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="ejemplo@facmed.unam.mx"
              className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label 
            htmlFor="password" 
            className="text-sm font-medium text-on-surface-variant"
          >
            Contraseña
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            </span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-12 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-sm">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-error-container text-on-error-container rounded-xl text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-primary text-white rounded-xl font-bold transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        > entrar
        </button>

      </form>
    </div>
  );
};

export default SignInForm;