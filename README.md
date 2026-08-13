# App para Expediente Clinico

Project made to stream a fixed number of **3 participants** on a video call, given 3 different roles.

# Auth 


# Database


# DexCare API
Since the intention is to pair up the app with the *Tyto interface*, an approved API must be used to fetch and display the sensor data.

# Streaming
This is handled by the API and service [Stream](https://getstream.io/video/sdk/react/tutorial/video-calling/).

*Npm* package is installed through
```
npm install @stream-io/node-sdk
npm install @stream-io/video-react-sdk
```

To get the videocall server running, on linux, install the *CLI* for `getstream`
```
curl -fsSL https://getstream.io/cli.sh | bash
```

## Concurrency

According to the getstream api docs, to limit the *connection pool* the library undici can be used in the following way 

>The Node SDK uses the built-in Fetch API to create HTTP requests. The Fetch API >uses a default connection pool that doesn't have a cap on the maximum >connections. If you want to limit this, or do any other configuration, you can >do it by installing the undici library.
```
# For Node 20.18.1+
npm install undici@7
```

And then 

```
import { Agent } from "undici";
const client = new StreamClient(apiKey, appSecret, {
  agent: new Agent({ connections: 100 }),
```




# Backend


# Usage

# Compatibility
