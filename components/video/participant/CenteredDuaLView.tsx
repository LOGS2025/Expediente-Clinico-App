import {
  DefaultParticipantViewUI,
  hasScreenShare,
  ParticipantView,
  StreamVideoParticipant,
} from '@stream-io/video-react-sdk';

export const CenteredDualView = (props: {
  participants: StreamVideoParticipant[];
}) => {
  const { participants } = props;

  return (
    <div className="flex h-full w-[50%] bg-slate-900">
      {participants.map((participant) => (
        <div key={participant.sessionId} className="flex-1">
          <ParticipantView
            participant={participant}
            trackType={
              hasScreenShare(participant)
                ? 'screenShareTrack'
                : 'videoTrack'
            }
            ParticipantViewUI={DefaultParticipantViewUI}
          />
        </div>
      ))}
    </div>
  );
};