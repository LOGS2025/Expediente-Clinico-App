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

// const Lobby = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Card Container */}
//         <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
//             <h2 className="text-white font-semibold text-lg flex items-center gap-2">
//               <span className="material-symbols-outlined">Decide unirte</span>
//             </h2>
//           </div>

//           {/* Video Preview Area */}
//           <div className="p-6">
//             <div className="bg-slate-900/50 rounded-2xl overflow-hidden aspect-video flex items-center justify-center border border-white/10">
//               <VideoPreview
//                 DisabledVideoPreview={DisabledVideoPreview}
//                 NoCameraPreview={NoCameraPreview}
//                 StartingCameraPreview={StartingCameraPreview}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


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