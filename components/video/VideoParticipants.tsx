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


export const FloatingParticipant = (props: {
  participant?: StreamVideoParticipant;
}) => {
  const { participant } = props;
  const call = useCall();
  const router = useRouter();
  return (
    <div
    className=''
    style={{
      position: 'relative',
      top: '15px',
      left: '215px',
      width: '300px',
      height: '300px',
      borderRadius: '12px',
    }}>
      {participant && <ParticipantView muteAudio participant={participant} />}

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
  )
}

const CustomCallControls = ({ children }: PropsWithChildren<{}>) => {
  return <div className="str-video__call-controls">{children}</div>;
};