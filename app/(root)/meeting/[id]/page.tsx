import { useEffect, useState } from 'react';
import { 
    StreamCall, StreamVideo, 
    StreamVideoClient, type User,
} from '@stream-io/video-react-sdk';

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { MyUILayout } from '@/components/video/VideoLayout';


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
