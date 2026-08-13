import { StreamClient, StreamVideoClient, UserRequest } from "@stream-io/node-sdk";
import { NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const secret = process.env.STREAM_API_SECRET;

export async function GET() {
    try {

        const client = new StreamClient(apiKey, secret, {timeout: 3000}); // Timeout added


        /**
         *      Creating a user
         *  Provide ID and role
         */
        const userId = 'oliver';
        const newUser: UserRequest = {
        id: userId,
        role: 'user',
        custom: {
            color: 'red',
        },
        name: 'oliver',
        };
        await client.upsertUsers([newUser]);

        // validity is optional (by default the token is valid for an hour)
        const validity = 60 * 60;
        const token = client.generateUserToken({ user_id: userId, validity_in_seconds: validity });

        /**
 *      Creating a call
        *  Calls can be used once or multiple times depending on your app. Unless you 
        *  want to re-use the same call multiple times, the recommended way to pick a 
        *  call ID is to use a uuid v4 so that each call gets a unique random ID.
        */
        const callType = 'development';
        const callId = 'my-first-call';
        const call = client.video.call(callType, callId);

        call.create({ data: { created_by_id: 'oliver' } });

        call.update()
        /**
         *  As members have to exits, assign in Agenda component and have it 
         *  sent to the database.
         */
        // optionally provide additional data
        call.create({
        data: {
            created_by_id: 'oliver',
            // Call members need to be existing users
            members: [{ user_id: 'oliver', role: 'admin' }],
            custom: {
            color: 'blue',
            },
        },
        });

        // Upsert behavior
        //call.getOrCreate({data: /* */});

         return NextResponse.json({
            success: true,
            callId,
            userId,
            token,
            message: 'Stream test successful!',
        });

} catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}