'use client'

import { useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import Button from "../ui/ButtonUniv";

const BottomBar = () => {
    const [audio, setAudio] = useState(true);
    const [camera, setCamera] = useState(true);

    return (
        <div className="fixed bottom-0 w-full">
            <div className="flex flex-row p-4 gap-6">
                <EndCall></EndCall>
                <ToggleAudio audio={audio} setAudio={setAudio}></ToggleAudio>
                <ToggleVideo camera={camera} setCamera={setCamera}></ToggleVideo>
                <LeaveCall></LeaveCall>
            </div>
        </div>
    )
}

export default BottomBar;

const EndCall = ()=>{
    const call = useCall();    
    return (
        <Button text="Terminar llamada" 
            onClick={()=> {call?.endCall().catch(() => console.error("Failed to leave the call"));}}/>
        )
}
const ToggleAudio = 
({audio, setAudio}:{audio : boolean, setAudio: React.Dispatch<React.SetStateAction<boolean>>})=>
    {
    const call = useCall();    
    return (
        <Button onClick={()=> {
            if ( audio ) {
                call?.microphone.disable();
                setAudio(!audio);
            } else {
                call?.microphone.enable();
                setAudio(!audio);
            }
            }} text="Audio"/>
    )
}
const ToggleVideo = ({camera, setCamera}:{camera : boolean, setCamera: React.Dispatch<React.SetStateAction<boolean>>})=>{
    const call = useCall();    
    return (
        <Button onClick={()=> {
            if ( camera ) {
                call?.camera.disable();
                setCamera(!camera);
            } else {
                call?.camera.enable();
                setCamera(!camera);
            }
            }} text="Video" />
    )
}
const LeaveCall = ()=>{
    const call = useCall();    
    return (
        <Button onClick={()=> {call?.leave().catch(() => console.error("Failed to leave the call"));}} text="Dejar la llamada" />
    )
}
