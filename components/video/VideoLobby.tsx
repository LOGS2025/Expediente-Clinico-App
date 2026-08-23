import {
  useConnectedUser,
  DefaultVideoPlaceholder,
  type StreamVideoParticipant,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { GoldenShineSvg, GoldenTreasureSvg } from "../ui/Svgs";


const Lobby = () => {
  return (
    <div>
      <div>
        <VideoPreview
          DisabledVideoPreview={DisabledVideoPreview}
          NoCameraPreview={NoCameraPreview}
          StartingCameraPreview={StartingCameraPreview}
        />
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