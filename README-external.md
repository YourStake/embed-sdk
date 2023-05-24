# YourStake Embed SDK

## Step 1: Getting the Authentication Code
- Once Yourstake has registered you oauth application in our system you will receive the following from us:
`client_id`, `redirect_uri`, `code_challenge`, `code_challenge_method` and `user_email`.
- To get the authentication code you must make a server side GET request to https://www.yourstake.org/api/v1/auth/embed/authorize/
    - The `HTTP_AUTHORIZATION` header must be the result of base64 encoding of this string: "[client_id]:[client_secret]" (without the square brackets).
    - The following query parameters must also be set:
        - `response_type`: must be set to the word `code`.
        - `client_id`: must be set to the `client_id` that you were provided after initial registration in our system.
        - `scope`: must be set to `write`
        - `redirect_uri`: must be set to the `redirect_uri` that you were provided after initial registration in our system
        - `code_challenge`: must be set to the `code_challenge` that you were provided after initial registration in our system
        - `code_challenge_method`: must be set to `S256`
        - `user_email`: must be set to the `user_email` that you were provided after initial registration in our system
    - There should be a `code` value in the response, this is the authorization code which will be needed later on for getting an oauth token.

## Step 2: Getting the Embed SDK
- In order to fetch the embed sdk, include the following script somewhere on the page (preferably in the head to ensure that it can load quickly enough relative to the rest of the page):
```
<script type="application/javascript" src="[insert path to yourstake sdk js file]"></script>
```
The "latest" sdk file can be found at: https://d1sax13m7bgtnp.cloudfront.net/embed/yourstake-embed-sdk-latest.js
and specific versions will be available at: https://d1sax13m7bgtnp.cloudfront.net/embed/yourstake-embed-sdk-[insert version].js

## Step 3: Initializing the Embed
- After step 2 the Yourstake embed constructor will be mounted on `window._YourStakeEmbed`.
- In order to initialize it you will need to provide the following:
    - `clientId`: this should be set to the `client_id` from step 1
    - `authCode`: this should be set to the authorization code from the response in step 1
    - `pkceCodeVerifier`: this should be set to the `code_challenge` from step 1
    - `oauthRedirectUri`: this should be set to the `redirect_uri` from step 1
    - `targetElementIdentifier`: this should be set to the id of the html element that the embed's iframe should be rendered inside of
    - `initialPage`: this should be set to the key of the page you want to load initially. If this is not provided it will default to `report-builder` as this is currently the only valid option.
    - `width`: this will specify the width of the iframe. It can be any valid css width value.
    - `height`: this will specify the height of the iframe. It can be any valid css height value.
- Here is an example:
```
window._YS_EMBED = new window._YourStakeEmbed({
    clientId: clientId,
    authCode: code,
    pkceCodeVerifier: pkceCodeVerifier,
    oauthRedirectUri: oAuthRedirectUri,
    targetElementIdentifier: "ys-embed-container",
    initialPage: 'report-builder',
    width: '100%',
    height: '90vh',
});
```
