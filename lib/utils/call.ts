import { StreamVideoClient } from "@stream-io/video-react-sdk";

export async function createCall(callType : string, 
    callId : string, client : StreamVideoClient
) {
    /**
     *      Creating a call
     *  Calls can be used once or multiple times depending on your app. Unless you 
     *  want to re-use the same call multiple times, the recommended way to pick a 
     *  call ID is to use a uuid v4 so that each call gets a unique random ID.
     */
    const call = client.call(callType, callId, { reuseInstance: true});
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