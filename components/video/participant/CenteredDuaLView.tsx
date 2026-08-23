import {
  DefaultParticipantViewUI,
  hasScreenShare,
  ParticipantView,
  StreamVideoParticipant,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

export const CenteredDualView = (props: {
  participants: StreamVideoParticipant[];
}) => {
  const { participants } = props;

  return (
    <div className="flex h-full w-full items-center justify-center gap-4">
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
          <div className='flex flex-col'>
            <span>{participant.sessionId}</span>
            <span>{participant.userId}</span>
            <span>{participant.roles}</span>
            <span>{participant.custom?.fields.role.kind.stringValue}</span>
          </div>
        </div>
      ))}
    </div>
  );
};