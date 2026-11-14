import { Call, CallingState } from '@stream-io/video-react-sdk';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const handleLeave = async (call : Call, router : AppRouterInstance) => {
  // Only leave if we haven't already left
  if (call.state.callingState !== CallingState.LEFT) {
    await call.leave().catch(console.error);
  }
  router.push('/');
};