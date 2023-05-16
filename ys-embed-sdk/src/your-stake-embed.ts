import { IFRAME_DOMAIN, getUrlForIFramePage, IFramePageKey } from "./iframe-navigation-utils";

interface YSEmbedSetupArgs {
    targetElementIdentifier: string
    initialPage: IFramePageKey
    width: string
    height: string
}
interface YSEmbedConstructorArgs extends YSEmbedSetupArgs {
    oAuthToken: string
}
interface YSEmbedInitArgs extends YSEmbedSetupArgs {
    clientId: string
    clientSecret: string
    authCode: string
    pkceCodeVerifier: string
    oAuthRedirectUri: string
}

class YourStakeEmbed {
    iframeDomain: string;
    oAuthToken: string;
    targetElement: HTMLElement;
    iframeElement: HTMLIFrameElement;
    currentPage: IFramePageKey;

    private constructor({
        oAuthToken,
        targetElementIdentifier,
        initialPage,
        width,
        height,
    } : YSEmbedConstructorArgs) {
        this.iframeDomain = IFRAME_DOMAIN;
        this.oAuthToken = oAuthToken;

        this.currentPage = initialPage;
        this.iframeElement = document.createElement('iframe');
        this.iframeElement.id = 'yourstake-embedded-iframe';
        this.resizeIframe(width, height);
        this.setIframePage(this.currentPage);

        this.targetElement = document.getElementById(targetElementIdentifier) as HTMLElement;
        this.targetElement.appendChild(this.iframeElement);

        window.addEventListener("message", (event) => this.handlePostMessageFromIFrame(event));
    }

    static async init({
        clientId,
        clientSecret,
        authCode,
        pkceCodeVerifier,
        oAuthRedirectUri,
        targetElementIdentifier,
        initialPage='report-builder',
        width,
        height,
    }: YSEmbedInitArgs) {
        const oAuthToken = await this.getAuthToken(clientId, clientSecret, authCode, pkceCodeVerifier, oAuthRedirectUri);
        return new YourStakeEmbed({
            oAuthToken: oAuthToken,
            targetElementIdentifier: targetElementIdentifier,
            initialPage: initialPage,
            width: width,
            height: height,
        });
    }

    resizeIframe(width: string, height: string) {
        // TODO add some validation to make sure these values are valid
        this.iframeElement.style.width = width;
        this.iframeElement.style.height = height;
    }

    setIframePage(pageKey: IFramePageKey) {
        this.currentPage = pageKey;
        // TODO check that the specified page is a valid page which the user is authorized to load
        this.iframeElement.src = getUrlForIFramePage(this.currentPage);
    }

    sendPostMessageToIFrame(data: Object) {
        // TODO structure and validate this
        console.log('parent sending post message')
        this.iframeElement.contentWindow?.postMessage(data, this.iframeDomain);
    }

    handlePostMessageFromIFrame(event: MessageEvent) {
        // TODO: insert whatever logic to handle each type of expected postmessage sent by iframe
        console.log('parent received post message with event: ', event);
        if (event.data === "requesting oauth token") {
            this.sendPostMessageToIFrame({oauthToken: this.oAuthToken})
        }
    }

    static async getAuthToken(clientId: string, clientSecret: string, authCode: string, pkceCodeVerifier: string, oAuthRedirectUri: string): Promise<string> {
        let response = await fetch(
            IFRAME_DOMAIN + '/oauth/token/',
            {
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'grant_type': 'authorization_code',
                    'client_id': clientId,
                    'client_secret': clientSecret,
                    'code': authCode,
                    'code_verifier': pkceCodeVerifier,
                    'redirect_uri': oAuthRedirectUri,
                })
            })
            // TODO handle error response, and also capture refresh token
            return (await response.json())['access_token']; 
    }
}

export default YourStakeEmbed;