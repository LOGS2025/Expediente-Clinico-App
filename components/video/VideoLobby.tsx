import {
  useConnectedUser,
  DefaultVideoPlaceholder,
  VideoPreview,
  StreamVideoParticipant,
  useStreamVideoClient,
} from '@stream-io/video-react-sdk';
import { GoldenShineSvg, GoldenTreasureSvg } from "../ui/Svgs";
import { useVideoCall } from '@/lib/hooks/useVideoCall';
import { useBoundStore } from '@/lib/hooks/useBoundStore';

const Lobby = () => {
  const videoDataSubmitted = useVideoCall((state)=>state);
  const userDataSubmitted = useBoundStore((state)=>state);

  const client = useStreamVideoClient();

  console.log(client?.state.connectedUser);

  return (
    <div className="flex flex-row items-center justify-center h-[70%] bg-slate-900 p-4">
      <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <VideoPreview
          DisabledVideoPreview={DisabledVideoPreview}
          NoCameraPreview={NoCameraPreview}
          StartingCameraPreview={StartingCameraPreview}
        />
      </div>
      <div className='flex flex-col'>
        <span>ID: {videoDataSubmitted.getCallId()}</span>
        <span>E-mail: {userDataSubmitted.email}</span>
        <span>Display Name: {userDataSubmitted.displayName}</span>
        <span>UUID: {userDataSubmitted.uid}</span>
        <span>Custom field: {client?.state.connectedUser?.custom?.role}</span>
      </div>
    </div>
  );
};

export const DisabledVideoPreview = () => {
  const connectedUser = useConnectedUser();
  if (!connectedUser) return null;

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          image: connectedUser.image,
          name: connectedUser.name,
        } as StreamVideoParticipant
      }
    />
  );
};

const NoCameraPreview = () => (
  <div>
    <GoldenTreasureSvg />
  </div>
);

const StartingCameraPreview = () => (
  <div>
    <GoldenShineSvg />
  </div>
);

export default Lobby;