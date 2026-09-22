import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import AppointmentForm from '../dashboard/appointment/AppointmentForm';

export const DraggableAppointmentForm = ()=> {
  const nodeRef = useRef(null);

  const centerX = (window.innerWidth - 300) / 2; // 300 ≈ card width
  const centerY = (window.innerHeight - 400) / 2; // 400 ≈ card height

  return (
    <Draggable nodeRef={nodeRef}
      defaultPosition={{x: centerX, y: centerY}}>
      <div ref={nodeRef}>
        <AppointmentForm/>
      </div>
    </Draggable>
  );
}