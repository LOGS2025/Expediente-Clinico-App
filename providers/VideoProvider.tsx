'use client'

import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { createVideoClient } from "@/lib/utils/client";
import { StreamVideo, StreamVideoClient, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { PropsWithChildren, useEffect, useState } from "react";

const callId = 'demo-call-y276HhfW';

export default function VideoProvider({children }: PropsWithChildren) {
   /**
   *    Once we receive the userData from our store, we setup a call we this data.
   *    And only if the user wants to join, we let him though a button.
   */
  const userData = useBoundStore((state)=>state);
  const [client, setClient] = useState<StreamVideoClient>();

  /**
   * Create a token, client and call
   */
  useEffect( () => {
    async function getToken() {
      const user_id = userData.getID();
      const user_name = userData.getName();
      try {
        if ( !user_id || !user_name ) throw new Error("No id found on store");
        const res = await fetch('/api/calls/generate-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: user_id,
            name: user_name,
            role: userData.getRole(),
          }),
        });
        const data = await res.json();

        const token = data.token;

        createVideoClient(
          token,
          user_id,
          user_name, setClient
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