'use client'

import { useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BottomBar = () => {
    const [audio, setAudio] = useState(true);
    const [camera, setCamera] = useState(true);
    const router = useRouter();

    return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-slate-900/90 backdrop-blur-xl border-t border-white/10 px-6 py-4">
        <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
          {/* Audio */}
          <ToggleAudio audio={audio} setAudio={setAudio} />
          
          {/* Video */}
          <ToggleVideo camera={camera} setCamera={setCamera} />
          
          {/* Spacer */}
          <div className="w-px h-8 bg-white/10" />
          
          {/* End Call (Primary) */}
          <EndCall/>
          
          {/* Spacer */}
          <div className="w-px h-8 bg-white/10" />
          
          {/* Leave Call */}
          <LeaveCall />
        </div>
      </div>
    </div>
  );
}


export default BottomBar;

const EndCall = ()=>{
    const call = useCall();    
    return (
        <button
            onClick={()=> {
                call?.endCall().catch(() => console.error("Failed to leave the call"));
            }}>
            Terminar llamada
        </button>
        )
}
const ToggleAudio = 
({audio, setAudio}:{audio : boolean, setAudio: React.Dispatch<React.SetStateAction<boolean>>})=>
    {
    const call = useCall();    
    return (
        <button onClick={()=> {
            if ( audio ) {
                call?.microphone.disable();
                setAudio(!audio);
            } else {
                call?.microphone.enable();
                setAudio(!audio);
            }
            }}>Audio</button>
    )
}
const ToggleVideo = ({camera, setCamera}:{camera : boolean, setCamera: React.Dispatch<React.SetStateAction<boolean>>})=>{
    const call = useCall();    
    return (
        <button onClick={()=> {
            if ( camera ) {
                call?.camera.disable();
                setCamera(!camera);
            } else {
                call?.camera.enable();
                setCamera(!camera);
            }
            }}>Video</button>
    )
}
const LeaveCall = ()=>{
    const call = useCall();    
    return (
        <button onClick={()=> {call?.leave().catch(() => console.error("Failed to leave the call"));}}>Dejar la llamada</button>
    )
}
