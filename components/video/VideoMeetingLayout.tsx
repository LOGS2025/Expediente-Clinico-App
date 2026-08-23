import { CallingState, CallParticipantsList, StreamTheme, useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import LoadingScreen from "../ui/LoadingScreen";
import { FloatingParticipant } from "./VideoParticipants";
import { useState } from "react";
import { CenteredOneView } from "./participant/ActiveMembers";
import { CenteredDualView } from "./participant/CenteredDuaLView";
import { CapibaraLoadingScreen } from "../ui/CapibaraLoadingScreen";

export const UIVideoLayout = () => {

  const { useCallCallingState, useCallMembers, 
    useParticipants, useParticipantCount,
    useLocalParticipant, useRemoteParticipants 
  } = useCallStateHooks();
  const members            =  useCallMembers();
  const callingState       =  useCallCallingState();
  const participantCount   =  useParticipantCount();
  const localParticipant  =  useLocalParticipant();
  const remoteParticipants =  useRemoteParticipants();
  const call               =  useCall();

  const [showParticipants, setShowParticipants] = useState<boolean>(true);

  const CallParticipantsDisplay = ()=>{
    return (
      <div className={`
        fixed top-0 right-0 h-full bg-slate-800 shadow-2xl 
        transition-all duration-300 ease-in-out z-40
        border-l border-white/10
        ${showParticipants ? 'w-80' : 'w-12'}
      `}>
        {/* Header - Always visible */}
        <div className="flex items-center justify-between p-2 border-b border-white/10">
          <button 
            onClick={() => setShowParticipants(!showParticipants)}
            className="text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 flex-shrink-0"
          >
            <span className="material-symbols-outlined">
              {showParticipants ? '' : 'chevron_left'}
            </span>
          </button>
        </div>
        
        {/* Content - Hidden when collapsed */}
        {showParticipants && (
          <div className="p-3 overflow-y-auto h-[calc(100%-64px)]">
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>
        )}
      </div>
    )
  }

  // console.log("Members",members);

  // allParticipants.map((participant)=>{
  //   console.log(participant.custom?.fields.role.kind.stringValue)
  // })
  console.log(localParticipant.custom?.fields.role.kind.stringValue)

  // console.log("Local", localParticipant);
  console.log("Remote", remoteParticipants);
  // console.log("Count", participantCount);

  if (callingState !== CallingState.JOINED) {
    return <LoadingScreen/>;
  }

  if (participantCount < 1) {
    return (
      <div className="fixed inset-0 h-full w-full bg-slate-900">
        <CapibaraLoadingScreen count={participantCount} />
      </div>
    );
  }

  function displayMainParticipants( whoami : string ) {
    switch (whoami) {
      case 'telemedic':
        return (
          <div>
            { localParticipant && <CenteredOneView participant={localParticipant}/>}
          </div>
        )
      case 'patient':
        return (
          <div>
            { localParticipant && <CenteredOneView participant={localParticipant}/>}
          </div>
        )
      default:
      case 'supervisor':
        // Show dual participants on middle
        // TODO adapt to phone to show as flex-col instead of flex-row
        return (
          <div>
            { localParticipant && <CenteredDualView participants={remoteParticipants}/> }    
          </div>
        )
    
    }
  }

  return (
    <div className="pt-10 h-full w-full items-center justify-center">
      {/* <Navbar/> */}
      <StreamTheme>
        {/* Main logic */}
        {/* {displayMainParticipants(localParticipant.custom?.fields.role.kind.stringValue)} */}
        { localParticipant && <CenteredDualView participants={remoteParticipants}/> }    


        {/* Rendering order matters */}
        { localParticipant && localParticipant.custom?.fields.role.kind.stringValue == 'supervisor' &&
          <FloatingParticipant participant={localParticipant}/> }

      {/* Participant listing */}
      <CallParticipantsDisplay/>
      </StreamTheme>
    </div>
  );
};


