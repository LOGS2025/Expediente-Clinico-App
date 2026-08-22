'use client'

import SignInForm from "@/components/auth/SignInForm"
import { useBoundStore } from "@/lib/hooks/useBoundStore"

// We first find if our user exists.

// we use his token as user id on the users table to look for this user?

const SignIn = ()=> {
    const userState = useBoundStore((state)=>state);

    console.log(userState.getID());
    return (
        <>
        <SignInForm></SignInForm>
        </>
    )
}

export default SignIn;
