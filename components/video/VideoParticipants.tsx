import { ParticipantView, StreamVideoParticipant } from "@stream-io/video-react-sdk";

/*
 *  Use userId as the key to position and name
 *  each user Video image! 
 */

export const VideoParticipants = (props: {
  participants: StreamVideoParticipant[];
}) => {
  const { participants } = props;
  console.log(participants);

  
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2">

      {participants.map((participant) => (
        <>
          <ParticipantView
            participant={participant}
            key={participant.sessionId}
          />
        </>
      ))}

    </div>
  );
};