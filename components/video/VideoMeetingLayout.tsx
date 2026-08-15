import { CallingState, StreamTheme, useCallStateHooks, useFilteredParticipants } from "@stream-io/video-react-sdk";
import { VideoParticipants } from "./VideoParticipants";
import { VideoLocalFloating } from "./VideoLocalFloating";

export const VideoLayout = () => {

  const { useCallCallingState, useLocalParticipant, useRemoteParticipants } =
    useCallStateHooks();
  
  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  const allParticipants = useFilteredParticipants({ excludeLocalParticipant: false })

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <StreamTheme>
        <VideoParticipants participants={allParticipants} />
        {/* <VideoLocalFloating participant={localParticipant} /> */}
      </StreamTheme>
    </>
  );
};
