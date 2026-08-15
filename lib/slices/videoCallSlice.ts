import { StreamVideoClient } from "@stream-io/node-sdk";
import { Call } from "@stream-io/video-react-sdk";

export type VideoCallSlice = {
    callID: string,
    name: string,
    call: Call | null,
    client: StreamVideoClient | null,

    setCall: (call: Call) => void;
    setClient: (client : StreamVideoClient) => void;

    getCall: () => void;
    getClient: ()=> void;
};