'use client'

import SignInForm from "@/components/auth/SignInForm"

// We first find if our user exists.

// we use his token as user id on the users table to look for this user?

const SignIn = ()=> {
    return (
        <>
        <SignInForm></SignInForm>
        </>
    )
}

export default SignIn;
