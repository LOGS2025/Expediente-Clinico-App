'use client';

import { useEffect, useState } from 'react';
import { useBoundStore } from '@/lib/hooks/useBoundStore';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/models/User';
import { getUserWithID } from '@/lib/supabase/users';

/*
 *  Should only expect an email and a password assuing the account creation 
 *  is done manually for each user 
 */

export const SignInForm = () => {
  const router = useRouter();
  const login = useBoundStore((state) => state.login);
  const error = useBoundStore((state) => state.error);
  const [tmpUserFetch, setTmpUserFetch] = useState<User | null>(null);

  const [userid, setUserid] = useState<string>('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function iniciarSesion(user_id : string) {
    try {
      const data = await getUserWithID(user_id);
  
      if ( !data ) throw new Error("No data received from supabase");
  
      const userBuild : User = {
        nombre: data.nombre,
        apellido_p: data.apellido_p,
        apellido_m: data.apellido_m,
        user_id: data.user_id,
        role: data.supervisor!=null ? 'supervisor' : 
          data.telemedico!=null ? 'doctor' : 
          data.paciente!=null ? 'patient' : 
          'indefinido'
      }
      setTmpUserFetch(userBuild);
      console.log(userBuild);
      login(userBuild);

    } catch(err) {
      console.error(err);
    }
  }

  useEffect(()=>{
    if ( tmpUserFetch ) {
      login(tmpUserFetch);
    }
  },[tmpUserFetch])


  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!userid || !password) {
    return;
    }
    
    try {
          iniciarSesion(userid);
          router.push('/');
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
              type="text" // Change later
              value={userid}
              onChange={(e) => {
                setUserid(e.target.value);
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