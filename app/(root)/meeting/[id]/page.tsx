'use client'

import { StreamCall, useCall, useStreamVideoClient} from '@stream-io/video-react-sdk';
import { VideoLayout } from '@/components/video/VideoMeetingLayout';
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useEffect, useState } from 'react';
import BottomBar from '@/components/dashboard/Bottombar';

// TODO -> Create tokens
const callId = 'demo-call-y276HhfW';

export default function Call() {
  const client = useStreamVideoClient();
  const call = client?.call('default', callId, { reuseInstance: true });
  
  useEffect(()=>{
    if ( call )
      call.join({ create: true }); 
  },[call, client]);

  return (
    <div className=''>
      <StreamCall call={call}>
        <VideoLayout/>

        <BottomBar/>
      </StreamCall>
    </div>
  )
}
