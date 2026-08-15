import { StreamVideoClient, User } from "@stream-io/video-react-sdk";

const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export function createClientAndCall(token : string, 
    id : string, name : string, setClient : any, setCall : any
) {
    const user: User = { 
      id: id, 
      name: name, 
      //image: '', 
      type: 'authenticated' as const 
    };
    const client = StreamVideoClient.getOrCreateInstance({  
      apiKey: apikey, user: user, token: token 
    });
    setClient(client);
    createCall('default', '010101', client, setCall);

    return () => {
      // dispose the client once you don't need it anymore
      client.disconnectUser().catch((err) => console.error(err));
    };
}


export async function createCall(callType : string, 
    callId : string, client : StreamVideoClient, setCall : any
) {
    /**
     *      Creating a call
     *  Calls can be used once or multiple times depending on your app. Unless you 
     *  want to re-use the same call multiple times, the recommended way to pick a 
     *  call ID is to use a uuid v4 so that each call gets a unique random ID.
     */
    const call = client.call(callType, callId, { reuseInstance: true});
    setCall(call);

    call.getOrCreate();
    //call.update();

    try {
      await call.microphone.enable();
      await call.camera.enable();
    } catch (err) {
      // handle the error (log, show a toast, etc.)
      console.error("Failed to enable a device", err);
    }
}