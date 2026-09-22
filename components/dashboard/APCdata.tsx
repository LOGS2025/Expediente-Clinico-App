// components/apc/APCSwiper.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { APCS } from '@/lib/utils/apcData';

export const APCSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentAPC = APCS[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold" style={{ color: '#27363F' }}>
          Rúbricas TeleAPC
        </h2>
        <span className="text-sm" style={{ color: '#8EA1AE' }}>
          {currentIndex + 1} / {APCS.length}
        </span>
      </div>

      {/* Swipeable Card */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl shadow-xl"
        style={{
          backgroundColor: '#DCE0E8',
          touchAction: 'pan-y',
        }}
      >
        <div
          className="transition-transform duration-300 ease-out"
        >
          {/* APC Content */}
          <div className="p-8">
            {/* APC Badge */}
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white mb-4"
              style={{ backgroundColor: currentAPC.color }}
            >
              {currentAPC.short}
            </div>

            {/* Title */}
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: '#27363F' }}
            >
              {currentAPC.title}
            </h3>

            {/* Description */}
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: '#685652' }}
            >
              {currentAPC.description}
            </p>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <button
                className="px-4 py-2 rounded-lg font-medium text-white transition-all hover:scale-105"
                style={{ backgroundColor: '#27363F' }}
              >
                Evaluar
              </button>
              <button
                className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: '#BEB3AC',
                  color: '#27363F',
                }}
              >
                Ver detalles
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {APCS.map((apc, index) => (
          <button
            key={apc.id}
            onClick={() => {
            }}
            className="transition-all duration-300 rounded-full"
            style={{
              width: index === currentIndex ? '32px' : '10px',
              height: '10px',
              backgroundColor:
                index === currentIndex ? '#27363F' : '#8EA1AE',
            }}
            aria-label={`Ir a ${apc.short}`}
          />
        ))}
      </div>

      {/* Arrow Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={()=>{
            setCurrentIndex(currentIndex - 1)
          }}
          disabled={currentIndex === 0}
          className="px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-30"
          style={{
            backgroundColor: '#DCE0E8',
            color: '#27363F',
          }}
        >
          ← Anterior
        </button>
        <button
          onClick={()=>{
            setCurrentIndex(currentIndex + 1)
          }}
          disabled={currentIndex === APCS.length - 1}
          className="px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-30"
          style={{
            backgroundColor: '#27363F',
            color: '#DCE0E8',
          }}
        >
          Siguiente →
        </button>
      </div>

      {/* Swipe Hint */}
      <p
        className="text-center text-sm mt-4"
        style={{ color: '#8EA1AE' }}
      >
        Desliza o usa las flechas del teclado para navegar
      </p>
    </div>
  );
};

export default APCSwiper;