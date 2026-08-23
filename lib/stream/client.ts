import { StreamVideoClient, User } from "@stream-io/video-react-sdk";

const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export function createVideoClient(token : string, 
    id : string, name : string, image: string, setClient : any
) {
    const user: User = { 
      id: id, 
      name: name, 
      image: image, 
      type: 'authenticated' as const 
    };

    const client = StreamVideoClient.getOrCreateInstance({  
      apiKey: apikey, user: user, token: token 
    });


    setClient(client);

    return () => {
      // dispose the client once you don't need it anymore
      client.disconnectUser().catch((err) => console.error(err));
    };
}
