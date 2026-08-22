import { ParticipantView, StreamVideoParticipant } from "@stream-io/video-react-sdk";

interface VideoParticipantsProps {
  participants: StreamVideoParticipant[];
}

export const VideoParticipants = ({ participants }: VideoParticipantsProps) => {
  console.log('Participants:', participants);

  if (participants.length === 0) {
    return (
      <div className="flex h-full w-full bg-slate-900 items-center justify-center">
        <div className="text-white/50 text-center">
          <span className="material-symbols-outlined text-6xl">person</span>
          <p className="mt-2">Esperando participantes...</p>
        </div>
      </div>
    );
  }

  if (participants.length === 1) {
    return (
      <div className="flex h-full w-full bg-slate-900">
        <div className="flex-1">
          <ParticipantView participant={participants[0]} />
        </div>
        {/* Empty second half with waiting text */}
        <div className="flex-1 bg-slate-800/50 flex items-center justify-center">
          <div className="text-white/30 text-center">
            <span className="material-symbols-outlined text-4xl">person_add</span>
            <p className="text-sm mt-1">Esperando participante...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full bg-slate-900">
      {/* First participant - left half */}
      <div className="flex-1 min-w-0">
        <ParticipantView 
          participant={participants[0]} 
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* Second participant - right half */}
      <div className="flex-1 min-w-0 border-l border-white/10">
        <ParticipantView 
          participant={participants[1]} 
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};