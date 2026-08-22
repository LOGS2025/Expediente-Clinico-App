import { StreamClient, UserRequest } from "@stream-io/node-sdk";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const secret = process.env.STREAM_API_SECRET!;

export async function POST(request : NextRequest) {
    try {
        // Extract information from request body
        const body = await request.json();
        const { id, name, role } = body;

        if ( !id || !name || !role ) {
            console.error("Parameters missing");
            console.log(body);
            return NextResponse.json({
                success: false,
                error: 'Missing parameters'
            }, { status: 500 });
        }

        console.log("Information received from POST: ", body);

        const client = new StreamClient(apiKey, secret, {timeout: 3000}); // Timeout added

        /**
         *      Creating a user
         *  Provide ID and role
         */
        const newUser: UserRequest = {
        id: id, // userID
        role: 'user',
        name: name, // name
        };
        await client.upsertUsers([newUser]);

        // validity is optional (by default the token is valid for an hour)
        const validity = 60 * 60;
        const token = client.generateUserToken({ user_id: id, validity_in_seconds: validity });

        if ( !token ) throw new Error("No token was generated!!!");

         return NextResponse.json({
            success: true,
            token: token,            
            message: 'Stream test successful!',
        }, { status: 200});

} catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}