'use client'

import { useRouter } from 'next/navigation';
import { useBoundStore } from "@/lib/hooks/useBoundStore"
import { logoutSVG } from "@/assets/images";
import { handleGoogleSignIn } from '@/lib/firebase/user';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';

import Image from "next/image";
import { ComponentProps, useEffect, useState } from 'react';

import './page.css'

/*
 *  Should only expect an email and a password assuing the account creation 
 *  is done manually for each user 
 */
const googleProvider = new GoogleAuthProvider();


const SignIn = ()=> {
    const loggedIn = useBoundStore((state)=>state.loggedIn);
    const logout = useBoundStore((state)=>state.logout);

    const router = useRouter();
    const login = useBoundStore((state) => state.login);
    const error = useBoundStore((state) => state.error);
    const userState = useBoundStore((state)=>state);

    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(()=>{
      console.log(loading);
    },[])

    async function googleSignIn() {
        setLoading(true);
        const res = await handleGoogleSignIn({
        auth: auth, 
        googleProvider: googleProvider,
        login
        })
        if ( !loggedIn ) {
          setLoading(false);
        }
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
    <div
    className="w-auto h-dvh flex flex-col bg-[url('@/assets/FacMedVista1.png')]
    bg-cover bg-no-repeat
        ">
        <article className="fixed inset-0 flex flex-col p-7 transition duration-300">
        <div className="flex grow items-center justify-center">
            <div className="flex w-full flex-col gap-5 sm:w-96">
              <h2 className="text-center text-2xl font-bold">
                  Inicia sesion
              </h2>
              <div className="flex flex-col gap-5">
                  { !loading && btn_log_in() }
                  { loggedIn && !loading &&
                    <button
                        className="z-30 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-b-4 bg-white border-gray-200 py-3 font-bold text-blue-900 transition 
                        hover:bg-gray-50 hover:brightness-90"
                        onClick={()=>logout()}>
                        <Image width={20} height={20} src={logoutSVG.src} alt="logout icon as door with exit arrow" className="h-5 w-5" /> Cerrar sesion
                    </button>
                  }
                  <div className='flex justify-center'>
                  { loading && <Loader/>}
                  </div>
              </div>
            </div>
        </div>
        </article>
    </div>
  )
}

export default SignIn;


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

const Loader = ()=>{
  return (
  <div className="loader">
    <svg id="cloud" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <filter id="roundness">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5"></feGaussianBlur>
          <feColorMatrix
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"
          ></feColorMatrix>
        </filter>
        <mask id="shapes">
          <g fill="white">
            <polygon points="50 37.5 80 75 20 75 50 37.5"></polygon>
            <circle cx="20" cy="60" r="15"></circle>
            <circle cx="80" cy="60" r="15"></circle>
            <g>
              <circle cx="20" cy="60" r="15"></circle>
              <circle cx="20" cy="60" r="15"></circle>
              <circle cx="20" cy="60" r="15"></circle>
            </g>
          </g>
        </mask>
        <mask id="clipping" clipPathUnits="userSpaceOnUse">
          <g id="lines" filter="url(#roundness)">
            <g mask="url(#shapes)" stroke="white">
              <line x1="-50" y1="-40" x2="150" y2="-40"></line>
              <line x1="-50" y1="-31" x2="150" y2="-31"></line>
              <line x1="-50" y1="-22" x2="150" y2="-22"></line>
              <line x1="-50" y1="-13" x2="150" y2="-13"></line>
              <line x1="-50" y1="-4" x2="150" y2="-4"></line>
              <line x1="-50" y1="5" x2="150" y2="5"></line>
              <line x1="-50" y1="14" x2="150" y2="14"></line>
              <line x1="-50" y1="23" x2="150" y2="23"></line>
              <line x1="-50" y1="32" x2="150" y2="32"></line>
              <line x1="-50" y1="41" x2="150" y2="41"></line>
              <line x1="-50" y1="50" x2="150" y2="50"></line>
              <line x1="-50" y1="59" x2="150" y2="59"></line>
              <line x1="-50" y1="68" x2="150" y2="68"></line>
              <line x1="-50" y1="77" x2="150" y2="77"></line>
              <line x1="-50" y1="86" x2="150" y2="86"></line>
              <line x1="-50" y1="95" x2="150" y2="95"></line>
              <line x1="-50" y1="104" x2="150" y2="104"></line>
              <line x1="-50" y1="113" x2="150" y2="113"></line>
              <line x1="-50" y1="122" x2="150" y2="122"></line>
              <line x1="-50" y1="131" x2="150" y2="131"></line>
              <line x1="-50" y1="140" x2="150" y2="140"></line>
            </g>
          </g>
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        rx="0"
        ry="0"
        mask="url(#clipping)"
      ></rect>
      <g>
        <path
          d="M33.52,68.12 C35.02,62.8 39.03,58.52 44.24,56.69 C49.26,54.93 54.68,55.61 59.04,58.4 C59.04,58.4 56.24,60.53 56.24,60.53 C55.45,61.13 55.68,62.37 56.63,62.64 C56.63,62.64 67.21,65.66 67.21,65.66 C67.98,65.88 68.75,65.3 68.74,64.5 C68.74,64.5 68.68,53.5 68.68,53.5 C68.67,52.51 67.54,51.95 66.75,52.55 C66.75,52.55 64.04,54.61 64.04,54.61 C57.88,49.79 49.73,48.4 42.25,51.03 C35.2,53.51 29.78,59.29 27.74,66.49 C27.29,68.08 28.22,69.74 29.81,70.19 C30.09,70.27 30.36,70.31 30.63,70.31 C31.94,70.31 33.14,69.44 33.52,68.12Z"
        ></path>
        <path
          d="M69.95,74.85 C68.35,74.4 66.7,75.32 66.25,76.92 C64.74,82.24 60.73,86.51 55.52,88.35 C50.51,90.11 45.09,89.43 40.73,86.63 C40.73,86.63 43.53,84.51 43.53,84.51 C44.31,83.91 44.08,82.67 43.13,82.4 C43.13,82.4 32.55,79.38 32.55,79.38 C31.78,79.16 31.02,79.74 31.02,80.54 C31.02,80.54 31.09,91.54 31.09,91.54 C31.09,92.53 32.22,93.09 33.01,92.49 C33.01,92.49 35.72,90.43 35.72,90.43 C39.81,93.63 44.77,95.32 49.84,95.32 C52.41,95.32 55,94.89 57.51,94.01 C64.56,91.53 69.99,85.75 72.02,78.55 C72.47,76.95 71.54,75.3 69.95,74.85Z"
        ></path>
      </g>
    </svg>
  </div>
  )
}