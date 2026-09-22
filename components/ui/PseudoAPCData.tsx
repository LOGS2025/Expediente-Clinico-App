// components/ui/PseudoAPCData.tsx
'use client';

import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import APCSwiper from '../dashboard/APCdata';

interface DraggableAPCsProps {
  onClose?: () => void;
}

export const DraggableAPCs = ({ onClose }: DraggableAPCsProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  /**
   * No regresa el centro
   */
  const getCenterPosition = () => {
    if (typeof window === 'undefined') {
      return { x: 0, y: 0 };
    }
    return {
      x: (window.innerWidth - 300) / 2,
      y: (window.innerHeight - 400) / 2,
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      
      <Draggable 
        nodeRef={nodeRef}
        defaultPosition={getCenterPosition()}
      >
        <div ref={nodeRef} className="cursor-move relative z-10">
          {/* Close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors z-20 flex items-center justify-center"
              aria-label="Cerrar"
            >
              ✕
            </button>
          )}
          <APCSwiper />
        </div>
      </Draggable>
    </div>
  );
};

export default DraggableAPCs;