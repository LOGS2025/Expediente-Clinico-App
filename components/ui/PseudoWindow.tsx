import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import AppointmentForm from '../dashboard/appointment/AppointmentForm';

export const DraggableAppointmentForm = ()=> {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef}>
        <AppointmentForm/>
      </div>
    </Draggable>
  );
}