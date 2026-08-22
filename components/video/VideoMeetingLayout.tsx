import { CallingState, StreamTheme, useCallStateHooks } from "@stream-io/video-react-sdk";
import { VideoParticipants } from "./VideoParticipants";
import LoadingScreen from "../ui/LoadingScreen";

export const VideoLayout = () => {

  const { useCallCallingState, useCallMembers, useParticipants } =
    useCallStateHooks();
  const members = useCallMembers();
  const callingState = useCallCallingState();
  const allParticipants = useParticipants();

  if (callingState !== CallingState.JOINED) {
    return <LoadingScreen/>;
  }

  return (
    <div className="h-full w-full">
      <StreamTheme>
        <VideoParticipants participants={allParticipants} />
      </StreamTheme>
    </div>
  );
};
