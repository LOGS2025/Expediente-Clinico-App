import { CallingState, StreamTheme, useCallStateHooks } from "@stream-io/video-react-sdk";
import { VideoParticipants } from "./participant/VideoParticipants";
import { VideoLocalFloating } from "./participant/VideoLocalFloating";


export const MyUILayout = () => {
  const { useCallCallingState, useLocalParticipant, useRemoteParticipants } =
    useCallStateHooks();

  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <VideoParticipants participants={remoteParticipants} />
      <VideoLocalFloating participant={localParticipant} />
    </StreamTheme>
  );
};
