import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import AppointmentForm from '../dashboard/appointment/AppointmentForm';

export const DraggableAppointmentForm = ()=> {
  const nodeRef = useRef(null);

  const centerX = (window.innerWidth  - 400) / 2;
  const centerY = (window.innerHeight - 900 ) / 2;

  return (
    <Draggable nodeRef={nodeRef}
      defaultPosition={{x: centerX, y: centerY}}>
      <div ref={nodeRef}>
        <AppointmentForm/>
      </div>
    </Draggable>
  );
}