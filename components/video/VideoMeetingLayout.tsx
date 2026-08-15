import { CallingState, StreamTheme, useCallStateHooks, useFilteredParticipants } from "@stream-io/video-react-sdk";
import { VideoParticipants } from "./VideoParticipants";

export const VideoLayout = () => {

  const { useCallCallingState, useCallMembers, useParticipants } =
    useCallStateHooks();
  const members = useCallMembers();
  const callingState = useCallCallingState();
  const allParticipants = useParticipants();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <StreamTheme>
        <VideoParticipants participants={allParticipants} />
      </StreamTheme>
    </div>
  );
};
