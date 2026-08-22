import { CallingState, StreamTheme, useCallStateHooks } from "@stream-io/video-react-sdk";
import { VideoParticipants } from "./VideoParticipants";
import LoadingScreen from "../ui/LoadingScreen";
import { SpeakerView } from "./SpeakerView";

export const VideoLayout = () => {

  const { useCallCallingState, useCallMembers, useParticipants } =
    useCallStateHooks();
  const members = useCallMembers();
  const callingState = useCallCallingState();
  const allParticipants = useParticipants();

  console.log(members);

  if (callingState !== CallingState.JOINED) {
    return <LoadingScreen/>;
  }

  return (
    <div className="h-full w-full">
      <StreamTheme>
        <SpeakerView/>
        {/* <VideoParticipants participants={allParticipants} /> */}
      </StreamTheme>
    </div>
  );
};
