import {
  CancelCallButton,
  combineComparators,
  Comparator,
  conditional,
  DefaultParticipantViewUI,
  dominantSpeaker,
  hasScreenShare,
  ParticipantView,
  pinned,
  publishingAudio,
  publishingVideo,
  reactionType,
  ScreenShareButton,
  screenSharing,
  speaking,
  SpeakingWhileMutedNotification,
  StreamVideoParticipant,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  useCall,
  useCallStateHooks,
  VisibilityState,
} from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

export const CenteredOneView = (props: {
  participant : StreamVideoParticipant;
}) => {
  const { participant } = props;
  const call = useCall();
  const router = useRouter();

  return (
    <div>
      { participant &&  
        <ParticipantView
          participant={participant}
          trackType={
            hasScreenShare(participant)
              ? 'screenShareTrack'
              : 'videoTrack'
          }
          ParticipantViewUI={DefaultParticipantViewUI}
        />
      }
            <CustomCallControls>
        <ScreenShareButton />
        <SpeakingWhileMutedNotification>
          <ToggleAudioPublishingButton />
        </SpeakingWhileMutedNotification>
        <ToggleVideoPublishingButton />
        {call && (
          <CancelCallButton
            onLeave={() => {
              call.leave();
              router.push('/');
            }}
          />
        )}
      </CustomCallControls>
    </div>
  );
}

const CustomCallControls = ({ children }: PropsWithChildren<{}>) => {
  return <div className="str-video__call-controls">{children}</div>;
};