// components/video/VideoCall.tsx
'use client';

import { StreamVideo, StreamCall } from '@stream-io/video-react-sdk';
import { useVideoCall } from '@/lib/hooks/useVideoCall';
import { MyUILayout } from './VideoLayout';

interface VideoCallProps {
  callId: string;
}

export default function VideoCall({ callId }: VideoCallProps) {
  const { client, call, loading, error } = useVideoCall(callId);

  if (loading || !client || !call) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto" />
          <p className="mt-4">Conectando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="text-center text-red-400">
          <p className="text-lg">Error al conectar</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}