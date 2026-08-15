'use client'

import { useCall, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useState } from "react";

const BottomBar = () => {
    const call = useCall();
    const [audio, setAudio] = useState(true);
    const [camera, setCamera] = useState(true);

    return (
        <div className="flex flex-row p-4 gap-6">
            <EndCall></EndCall>
            <ToggleAudio audio={audio} setAudio={setAudio}></ToggleAudio>
            <ToggleVideo camera={camera} setCamera={setCamera}></ToggleVideo>
            <LeaveCall></LeaveCall>
        </div>
    )
}

export default BottomBar;

const EndCall = ()=>{
    const call = useCall();    
    return (
        <button onClick={()=> {call?.endCall().catch(() => console.error("Failed to leave the call"));}}>
            <span>End Call</span>
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
            }}>
            <span>Toggle Audio</span>
        </button>
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
            }}>
            <span>Toggle Video</span>
        </button>
    )
}
const LeaveCall = ()=>{
    const call = useCall();    
    return (
        <button onClick={()=> {call?.leave().catch(() => console.error("Failed to leave the call"));}}>
            <span>Leave Call</span>
        </button>
    )
}
