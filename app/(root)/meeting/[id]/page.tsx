// app/meeting/[callId]/page.tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useVideoCall } from "@/lib/hooks/useVideoCall";
import { StreamCall, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { UIVideoLayout } from "@/components/video/VideoMeetingLayout";
import Lobby from "@/components/video/VideoLobby";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import ErrorMessage from "@/components/ui/Error";
import { useBoundStore } from "@/lib/hooks/useBoundStore";

export default function MeetingPage() {
  const router = useRouter();

  const client = useStreamVideoClient();

  const callStore = useVideoCall();

  // Workflow for the status
  // idle|left|error -> ready -> joining -> joined -> leaving -> left
  // error
  const callStatus = useBoundStore((state)=>state.callStatus)
  const markError =   useBoundStore((state)=>state.markError);
  const markJoined =  useBoundStore((state)=>state.markJoined);
  const markJoining = useBoundStore((state)=>state.markJoining);
  const markLeaving = useBoundStore((state)=>state.markLeaving);
  const markLeft =    useBoundStore((state)=>state.markLeft);
  const markLoading = useBoundStore((state)=>state.markLoading);
  const markReady =   useBoundStore((state)=>state.markReady);
  const resetCall =   useBoundStore((state)=>state.resetCall);

  const [call, setCall] = useState<any>(null);
  const [callid, setCallid] = useState<any>(null);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  // Get participants from store (set when appointment is selected)
  const participants = callStore.getParticipantsUUID();
  
  
  // Debugger for callStatus
  useEffect(()=>{
    if ( callStatus == 'error' ){
      console.log("Call status : ",callStatus);
      router.push('/');
    }
  },[callStatus])

  // Call callid
  // Mark loading so ready can be called later
  useEffect(()=>{
    //resetCall()
    //markLoading();

    const callid = callStore.getCallId();
    setCallid(callid);
    console.log("Client state : ",client?.state);

  },[client])

  // Set call
  useEffect(() => {
    if (!client || !callid || joined && !call) return;

    const initCall = async () => {
      try {

        const streamCall = client.call("default", callid);
        // Check if call exists, create if not with members
        await streamCall.getOrCreate({// data: {//   members: [//     { user_id: participants.supervisor_uuid, role: "admin" },//     { user_id: participants.telemedic_uuid, role: "user" },//     { user_id: participants.patient_uuid, role: "user" },//   ],//   custom: {//     appointment_duration: 7200,//   },// },
        });
        setCall(streamCall);

        //markReady();

      } catch (err) {
        //resetCall();
        //markError("Failed to init call");
        setError(err instanceof Error ? err.message : "Failed to get call");
      }
    };

    initCall();
  }, [client, callid]);


  const joinCall = async () => {
    if (!call) {
      router.push('/');
    }

    try {
      //markJoining();
      setJoining(true);
        await call.join({ create: false });
        await call.camera.enable();
        await call.microphone.enable();
      setJoined(true);
      //markJoined();
    } catch (err) {
      //resetCall();
      //markError("Couldn't join call");
      setError(err instanceof Error ? err.message : "Join failed");
      setJoining(false);
    }
  };

  // If client not ready or call not initialized, show loading
  if (!client) {
    //markError("No client was found");
    return (
    <ErrorMessage message={"No client was found"}/>);
  } else if (!call) {
    //markError("Call wasn't able to be instantiated");
    return (
      <ErrorMessage message={"Call wasn't able to be instantiated"}/>
    )
  }

  return (
    <div>
      <div className="ml-[220px] mr-[100px]">
        <StreamCall call={call}>
          {joined ? (
            <UIVideoLayout />
          ) : (
            <div className="flex flex-col">
              <Lobby/>
              <button
                onClick={joinCall}
                disabled={joining}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
              >
                {joining ? "Joining..." : "Join Call"}
              </button>
              {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
          )}
        </StreamCall>
      </div>
    </div>
  );
}