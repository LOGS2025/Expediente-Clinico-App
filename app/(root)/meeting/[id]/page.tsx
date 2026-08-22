'use client'

import { StreamCall, useCall, useStreamVideoClient} from '@stream-io/video-react-sdk';
import { VideoLayout } from '@/components/video/VideoMeetingLayout';
import { useEffect, useState } from 'react';
import BottomBar from '@/components/dashboard/Bottombar';
import { useVideoCall } from '@/lib/hooks/useVideoCall';
import Lobby from '@/components/video/VideoLobby';
import ErrorMessage from '@/components/ui/Error';
import { useBoundStore } from '@/lib/hooks/useBoundStore';
import Button from '@/components/ui/ButtonUniv';

import "@stream-io/video-react-sdk/dist/css/styles.css";

interface Participants {

}

export default function Call() {
  const callInformation = useVideoCall((state)=>state);
  const userInformation = useBoundStore((state)=>state);
  const [wantIn, setWantIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validity, setValidity] = useState<boolean>(false);
  
  const client = useStreamVideoClient();
  const participants = callInformation.getParticipantsUUID();
  
  // Get instance of call if it exists  
  let call = useCall();
  if (!call ) 
    call = client?.call('default', callInformation.getCallId(), { reuseInstance: true});

  useEffect(()=>{
    try {
      const ourId = userInformation.getID();
      if (!ourId) throw new Error("No id provided");
      if ( ourId == participants.telemedic_uuid || ourId == participants.patient_uuid || ourId == participants.supervisor_uuid  ) {
        setValidity(true);
      } 
    } catch (error) {
      console.error("Error while checking member privilege on call : ", error);
      setError("No permission to join the videocall");
    }
  },[participants])

  async function joinCall() {
    await call?.getOrCreate({
      data: {
        members: [
          { user_id: participants.supervisor_uuid , role: 'admin',}, 
        //  { user_id: participants.patient_uuid}, 
        //  { user_id: participants.telemedic_uuid}
        ]
      }
    })
    call?.join();
  }

  if ( !call ) {
    return (
      <ErrorMessage message={"No call"}/>
    )
  }
  
  if ( call ) {
    return (
      <div>
        <div className='flex flex-col text-zinc-900 w-full h-full'>
          <StreamCall call={call}>
            { wantIn ? 
            <div>
              <VideoLayout/> 
            </div>
            : 
            <div>
              <Lobby/>
              { validity ? 
                (
                  <Button onClick={ async ()=>{ 
                    joinCall();
                    setWantIn(true); 
                  }} text='Unirse a la llamada'/>
                ) 
                : (<></>)
              }
            </div>
            }
            <BottomBar/>
          </StreamCall>
        </div>

        { error ? (
          <ErrorMessage message={error}/>
        ):(
          !validity ? (
            <ErrorMessage message={"No permission to join the call. Reload the page or try another call."}/>
          ) : ( <></> ) 
        )}
      </div>
    )
  }
}
