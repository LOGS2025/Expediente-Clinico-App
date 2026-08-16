import { TokenJSON } from "@/app/api/calls/generate-token/route";
import { UserSlice } from "../slices/userSlice";

export async function getToken(userData : UserSlice) {
    try {
    const res = await fetch('/api/calls/generate-token', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        id: userData.getID(),
        name: userData.getName(),
        role: userData.getRole(),
        }),
    });
    const data = await res.json();
    const tokenJson : TokenJSON = data.token;

    if (!data.success) 
        throw new Error(data.error);
    /**
     *  After getting the token we instantiate a client
     */
    } catch (error){
    console.error("No data returned", error);
    }
}