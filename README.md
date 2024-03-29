
# YourStake Embed SDK

* This repo is responsible for building the "sdk" which will render Yourstake experiences in an embedded iframe on client websites.
* NOTE: This README is intended for internal users. If you are looking for the public usage guide for the sdk see [this document](https://yourstake.github.io/integrations-guides/docs/guides/how-to-integrate-with-embed-sdk/) instead.
* If you are looking for instructions to setup your sdk with your local mock embed app, [see here](https://github.com/YourStake/embed-mock-app).

### `npm run build`
* By default this will build for local (`--mode=development`), but you can also build for production by specifying so: `npm run build --mode=production`.
* The js bundle file will be generated in the dist/ folder. When building for local environment the js bundle will be copied into the embed mock app repo's asset folder (`../embed-mock-app/frontend/src/assets/`). [Go here for details on setting up the embed mock app](https://github.com/YourStake/embed-mock-app).

### `npm run watch`
* You can use `npm run watch` if you would like for builds to run automatically whenever you change a file in the sdk.
