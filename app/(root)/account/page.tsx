'use client'

import { useBoundStore } from "@/lib/hooks/useBoundStore";

/**
 * Based off google gmail account editing page UI.
 */
const Account = ()=>{
    const user = useBoundStore((state)=>state);

    return (
        <div className="flex-row min-h-[40%]">

            {/* Space for user image logo */}
            <div className="flex justify-end p-5">
                <img className="min-w-3.5 min-h-3.5" src={user.photoURL} alt="users email photo provided by google" />
            </div>

        </div>
    )
}

export default Account;

/**
 * We get the tabs for
 */
const LeftBar = ()=>{
    return (
        <div>

        </div>
    )
}