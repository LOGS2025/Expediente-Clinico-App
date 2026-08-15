'use client'

import { useEffect, useState } from 'react';
import { 
  Call,
    StreamCall, StreamVideo, 
    StreamVideoClient, type User
} from '@stream-io/video-react-sdk';
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { MyUILayout } from '@/components/video/VideoLayout';
import { useBoundStore } from '@/lib/hooks/useBoundStore';
import { TokenJSON } from '@/app/api/calls/generate-token/route';
import { useVideoCall } from '@/lib/hooks/useVideoCall';
import { createClientAndCall } from '@/providers/Stream';

const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;


const VideoCall = ()=> {
  const userData = useBoundStore((state)=>state);
  const videoCallData = useVideoCall((state)=>state);
  const setStoreCall = useVideoCall((state)=>state.setCall);
  const setStoreClient = useVideoCall((state)=>state.setClient);
  
  const [error, setError] = useState<number>(200);
  const [client, setClient] = useState<StreamVideoClient>();
  const [call, setCall] = useState<Call|undefined>(undefined);
  const [wantIn, setWantIn] = useState<boolean>(false);

  /**
   *    Once we receive the userData from our store, we setup a call we this data.
   *    And only if the user wants to join, we let him though a button.
   */
  useEffect( () => {
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
          userData.getName(),
          setClient, setCall
        )

        if (!data.success) 
          throw new Error(data.error);
        /**
         *  After getting the token we instantiate a client
         */
      } catch (error){
        setError(401); // Token error
        console.error("No data returned", error);
      }
    }
    getToken();
  }, [userData]);


  
  

  // Upsert behavior
  //call.getOrCreate({data: /* */});

  if (error != 200) {
    return (
      <>
        Error {error}!!!
      </>
    )
  }

  /**
   * Couldnt get any client or call
   */
  if (!call || !client ) {
    return (
      <> No call or client </>
    )
  }

  if (!wantIn) {
    return (
    <>
    <button 
      className='border'
      onClick={async ()=> {
        setWantIn(true)
          if (!client) return;
            await call.join().catch((err) => console.error(err));

            return () => {
              // dispose the call once you don't need it anymore
              call.leave().catch((err) => console.error(err));
              setCall(undefined);
          };
        }}>
      Join Call
    </button>
    </>
    )
  }

  if ( wantIn) {
      return (
      <div className='flex'>

      <div className='border flex-1'>
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <MyUILayout />
          </StreamCall>
        </StreamVideo>
      </div>

      <div className='border flex-1'>
        <button 
        className='border'
        onClick={()=>{
          call.leave().catch(() => console.error("Failed to leave the call"));
          setWantIn(false);
          }}>
          Abandonar
        </button>
      </div>

      <div className='border flex-1'>
        <button 
        className='border'
        onClick={()=>{
          call.endCall().catch(() => console.error("Failed to leave the call"));
          setWantIn(false);
          }}>
          Terminar
        </button>
      </div>
      
      </div>
    );
  }
}

export default VideoCall;


// async function createCall(callType : string, callId : string, client : StreamVideoClient ) {
//     /**
//      *      Creating a call
//      *  Calls can be used once or multiple times depending on your app. Unless you 
//      *  want to re-use the same call multiple times, the recommended way to pick a 
//      *  call ID is to use a uuid v4 so that each call gets a unique random ID.
//      */
//     const call = client.call(callType, callId, { reuseInstance: true});

//     call.getOrCreate();
//     //call.update();
//     setCall(call);

//     try {
//       await call.microphone.enable();
//       await call.camera.enable();
//     } catch (err) {
//       // handle the error (log, show a toast, etc.)
//       console.error("Failed to enable a device", err);
//     }
//   }


