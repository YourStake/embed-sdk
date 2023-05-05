
# YourStake Embed SDK
This repo is responsible for building the Yourstake Embed SDK.

### Setup
You can setup the repo and build by running the following: `cd ys-embed-sdk && npm i && npm run build`

### Building
You can build the sdk file by running `npm run build`, although if you are making changes to the sdk you might want to use `npm run watch-build` instead for hot reloading.

After building you should see the sdk script at `ys-embed-sdk/dist/yourstake-embed-sdk-v1.js`

### Using the SDK
In order to use it you will need to keep Vite running `npm run dev`. This will run Vite on port 7173. The sdk file is being served from `http://localhost:7173/dist/yourstake-embed-sdk-v1.js`
