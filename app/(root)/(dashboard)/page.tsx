'use client'

import { useEffect, useState } from 'react';
import { 
    CallingState, StreamCall, StreamVideo, 
    StreamVideoClient, useCall, type User,
    useCallStateHooks, StreamTheme
} from '@stream-io/video-react-sdk';


import "@stream-io/video-react-sdk/dist/css/styles.css";


/*

app/
├── api/
│   └── calls/
│       └── generate-token/
│           └── route.ts          #  Creates call, no goLive()
└── test-call/
    └── page.tsx                  #  Client component using your API

    lib/
├── stream/
│   ├── client.ts                 #  Client factory
│   └── hooks/
│       └── useVideoCall.ts       #  Custom hook

components/
└── video/
    ├── VideoCall.tsx             #  Main component
    └── VideoCallLayout.tsx       #  UI layout

*/


export default function App() {
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<any>(null);

    useEffect(() => { const setup = async () => {
        try {
        // Get token and call info from server
        const res = await fetch('/api/calls/generate-token');
        const data = await res.json();
        
        if (!data.success) throw new Error(data.error);
        
        // Set up client
        const user: User = { id: data.userId, name: 'Oliver' };
        const stream_client = new StreamVideoClient({
            apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
            user,
            token: data.token,
        });

        setClient(stream_client);
        
        // Join call
        const stream_call = stream_client.call('default', data.callId);
        await stream_call.join({ create: true });
        await stream_call.camera.enable();
        await stream_call.microphone.enable();
        setCall(stream_call);
        
        } catch (err) {
            console.error(err);
        }
    }; setup(); }, []);

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState, useLocalParticipant, useRemoteParticipants } =
    useCallStateHooks();

  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <MyParticipantList participants={remoteParticipants} />
      <MyFloatingLocalParticipant participant={localParticipant} />
    </StreamTheme>
  );
};


import {
  ParticipantView,
  type StreamVideoParticipant,
} from "@stream-io/video-react-sdk";

// ... rest of the App.tsx code

export const MyParticipantList = (props: {
  participants: StreamVideoParticipant[];
}) => {
  const { participants } = props;
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
      {participants.map((participant) => (
        <ParticipantView
          participant={participant}
          key={participant.sessionId}
        />
      ))}
    </div>
  );
};

// ... rest of the App.tsx code

export const MyFloatingLocalParticipant = (props: {
  participant?: StreamVideoParticipant;
}) => {
  const { participant } = props;
  if (!participant) {
    return <p>Error: No local participant</p>;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "15px",
        left: "15px",
        width: "240px",
        height: "135px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 3px",
        borderRadius: "12px",
      }}
    >
      <ParticipantView participant={participant} />
    </div>
  );
};

// const Home = ()=> {
//    return (
//         <div>
//         </div>
//     );
// }

// export default Home;