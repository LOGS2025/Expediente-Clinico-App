import { create } from 'zustand'
import { VideoCallSlice } from '../slices/videoCallSlice'
import { 
    Call,
    StreamVideoClient, type User,
} from '@stream-io/video-react-sdk';

const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export const useVideoCall = create<VideoCallSlice>((set, get) => ({
    callID: '',
    name: '',
    call: null,
    client: null,

    setCall: (call : Call ) => set({call: call }),
    setClient: (client : StreamVideoClient ) => set({client: client}),

    getCall: () => get().call,
    getClient: ()=> get().client
}))
