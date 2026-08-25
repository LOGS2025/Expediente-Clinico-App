'use client';

import { ComponentProps } from 'react';
import { useBoundStore } from '@/lib/hooks/useBoundStore';
import { useRouter } from 'next/navigation';
import { CloseSvg } from "@/components/ui/Svgs"
import { handleGoogleSignIn } from '@/lib/firebase/user';
import { auth } from '@/lib/firebase/firebase';
import { GoogleAuthProvider } from 'firebase/auth';

/*
 *  Should only expect an email and a password assuing the account creation 
 *  is done manually for each user 
 */
const googleProvider = new GoogleAuthProvider();

export const SignInForm = () => {
  const router = useRouter();
  const login = useBoundStore((state) => state.login);
  const error = useBoundStore((state) => state.error);
  const userState = useBoundStore((state)=>state);

  async function googleSignIn() {
    handleGoogleSignIn({
      auth: auth, 
      googleProvider: googleProvider,
      login
    })
  }

  function btn_log_in() {
    if ( userState.loggedIn && userState.getID() ) {
      return (
      <button
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-b-4 bg-white border-gray-200 py-3 font-bold text-blue-600 transition hover:bg-gray-50 hover:brightness-90"
        onClick={()=>router.push('/')}>
          Entra al sitio
        </button>
      )
    } else {
      return (
      <button
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-b-4 bg-white border-gray-200 py-3 font-bold text-blue-600 transition hover:bg-gray-50 hover:brightness-90"
          onClick={googleSignIn}>
          <GoogleLogoSvg className="h-5 w-5" /> Google
        </button>
      )
   }
  }

  return (
    <article
      className="fixed inset-0 z-30 flex flex-col bg-[url('/FacMedVista1.png')]
        bg-cover bg-top bg-contain bg-no-repeat
      p-7 transition duration-300"
    >
      <header className="flex flex-row-reverse justify-between sm:flex-row">
        <button className="flex text-white">  <CloseSvg/> </button>
      </header>

      <div className="flex grow items-center justify-center">
        <div className="flex w-full flex-col gap-5 sm:w-96">
          <h2 className="text-center text-2xl font-bold">
            Inicia sesion
          </h2>
          <div className="flex gap-5">
            { btn_log_in() }
          </div>
        </div>
      </div>
    </article>
  );
};

export default SignInForm;


export const GoogleLogoSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <g>
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        ></path>
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        ></path>
        <path
          fill="#FBBC05"
          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        ></path>
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        ></path>
        <path fill="none" d="M0 0h48v48H0z"></path>
      </g>
    </svg>
  );
};