'use client'

import { useCall, useStreamVideoClient } from "@stream-io/video-react-sdk";

const callId = 'demo-call-y276HhfW';

const BottomBar = () => {
    const client = useStreamVideoClient();
    const call = client?.call( 'default', callId, { reuseInstance: true });
    //const call = useCall();
    
    return (
        <div className="flex flex-row p-4 gap-6">
            <button onClick={()=>call?.endCall()}>Terminar llamada</button>
            <button onClick={()=>call?.endCall()}>Terminar llamada</button>
        </div>
    )
}

export default BottomBar;

/* 
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
      </div> */
      