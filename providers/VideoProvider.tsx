'use client'

import { TokenJSON } from "@/app/api/calls/generate-token/route";
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { createClientAndCall } from "@/lib/utils/client";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { PropsWithChildren, useEffect, useState } from "react";

const callId = 'demo-call-y276HhfW';

export default function VideoProvider({children }: PropsWithChildren) {
   /**
   *    Once we receive the userData from our store, we setup a call we this data.
   *    And only if the user wants to join, we let him though a button.
   */
  const userData = useBoundStore((state)=>state);
  const [client, setClient] = useState<StreamVideoClient>();

  useEffect( () => {
    /**
     *      Creating a call
     *  Calls can be used once or multiple times depending on your app. Unless you 
     *  want to re-use the same call multiple times, the recommended way to pick a 
     *  call ID is to use a uuid v4 so that each call gets a unique random ID.
     */
    async function getToken() {
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

        createClientAndCall(
          tokenJson.token,
          userData.getID(),
          userData.getName(), callId, 
          setClient
        )

        if (!data.success) 
          throw new Error(data.error);
        /**
         *  After getting the token we instantiate a client
         */
      } catch (error){
        console.error("No data returned", error);
      }
    }
    getToken();
  }, [userData]);

  if (!client) {
    return (
        <div>
            Circle loading thing
        </div>
    )
  }

  return <StreamVideo client={client} >{children}</StreamVideo>
}