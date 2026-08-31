'use client'

import SignInForm from "@/components/auth/SignInForm"

// We first find if our user exists.

// we use his token as user id on the users table to look for this user?

const SignIn = ()=> {
    return (
        <div
        className="w-auto h-dvh flex flex-col bg-[url('@/assets/FacMedVista1.png')]
        bg-cover bg-no-repeat
          ">
        <SignInForm></SignInForm>
        </div>
    )
}

export default SignIn;
