import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { FloatingParticipant } from '../video/VideoParticipants';
import { StreamVideoParticipant } from '@stream-io/video-react-sdk';

export const DraggableFloating = ({participant}:{participant : StreamVideoParticipant})=> {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef}>
        <FloatingParticipant participant={participant}/>
      </div>
    </Draggable>
  );
}