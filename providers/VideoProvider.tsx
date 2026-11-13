// lib/providers/VideoProvider.tsx
'use client';

import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-sdk";
import { PropsWithChildren, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export default function VideoProvider({ children }: PropsWithChildren) {
  const userData = useBoundStore((state) => state);
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const initClient = async () => {
      try {
        const userId = userData.getID();
        const userName = userData.getName();
        if (!userId || !userName) {
          setLoading(false);
          return;
        }
        // Fetch token
        const res = await fetch("/api/calls/generate-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: userId,
            name: userName,
            role: userData.getRole(),
          }),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);

        // Create StreamVideoClient (React SDK)
        const user: User = {
          id: userId,
          name: userName,
          type: "authenticated",
          image: userData.photoURL || undefined,
        };

        if (isMounted) {
          /**
           * getOrCreateInstance added 12/11/2026 as api requests. Before a new client was 
           * tried to be created every time.
           */
          setClient(StreamVideoClient.getOrCreateInstance({apiKey: apiKey, user: user , token: data.token}))
          setLoading(false);
        }
      } catch (error) {
        console.error("VideoProvider init error:", error);
        if (isMounted) setLoading(false);
      }
    };

    initClient();

    return () => {
      isMounted = false;
      // Cleanup: disconnect client if exists
      if (client) {
        client.disconnectUser().catch(console.error);
      }
    };
  }, [userData]);

  if (loading) {
    console.log("Loading video client from VideoProvider.tsx")
    return <div>Loading video client...</div>;
  }
  
  if (!client) {
    console.log("Video client failed to load from VideoProvider.tsx")
    return <div>Video client not available</div>;
  }

  return <StreamVideo client={client}>{children}</StreamVideo>;
}