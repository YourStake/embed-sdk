import { IFRAME_DOMAIN, getUrlForIFramePage, IFramePageKey } from "./iframe-navigation-utils";

interface YSEmbedConstructorArgs {
    targetElementIdentifier: string
    initialPage: IFramePageKey
    slug: string
    params: {[key: string]: string}
    width: string
    height: string
    clientId: string
    authCode: string
    pkceCodeVerifier: string
    oauthRedirectUri: string
    onLoad: Function | null
}

type PostMessageType = 'auth_data'; // Note: any other types can be added here, i.e.  | 'some_other_message_type'

class YourStakeEmbed {
    iframeDomain: string;
    targetElement: HTMLElement;
    iframeElement: HTMLIFrameElement;
    currentPage: IFramePageKey;

    constructor({
        targetElementIdentifier,
        initialPage='report-builder',
        slug='',   // Will be appended to the end of the url
        params={}, // Will be added to the url as query params
        width,
        height,
        clientId,
        authCode,
        pkceCodeVerifier,
        oauthRedirectUri = IFRAME_DOMAIN,
        onLoad=null,
    } : YSEmbedConstructorArgs) {
        this.iframeDomain = IFRAME_DOMAIN;

        this.currentPage = initialPage;
        this.iframeElement = document.createElement('iframe');
        this.iframeElement.id = 'yourstake-embedded-iframe';
        this.resizeIframe(width, height);
        this.setIframePage(this.currentPage, slug, params);
        this.iframeElement.allow = `clipboard-write ${this.iframeDomain}`;
        this.iframeElement.onload = () => {
            this.sendPostMessageToIFrame('auth_data', {
                clientId,
                authCode,
                pkceCodeVerifier,
                oauthRedirectUri,
            });
            if (onLoad) onLoad()
        };

        this.targetElement = document.getElementById(targetElementIdentifier) as HTMLElement;
        this.targetElement.appendChild(this.iframeElement);

        // For messages sent by embedded YourStake back to parent
        window.addEventListener("message", (event) => {
            // Ensures that only messages actually from YourStake will be processed
            // Will need to set this up to support development environments as well
            const trustedOrigin = 'https://www.yourstake.org';
        
            if (event.origin === trustedOrigin) {
                this.handlePostMessageFromIFrame(event);
            } else {
                console.warn('Received message from untrusted origin:', event.origin);
            }
        });        
    }


    resizeIframe(width: string, height: string) {
        // TODO add some validation to make sure these values are valid
        this.iframeElement.style.width = width;
        this.iframeElement.style.height = height;
    }

    setIframePage(pageKey: IFramePageKey, slug: string, params: {[key: string]: string}) {
        this.currentPage = pageKey;
        // TODO check that the specified page is a valid page which the user is authorized to load
        this.iframeElement.src = getUrlForIFramePage(this.currentPage, slug, params);
    }

    sendPostMessageToIFrame(messageType: PostMessageType, messageData: Object) {
        // TODO structure and validate this
        const data = {messageType, messageData};
        console.log('parent sending post message of data: ', data);
        this.iframeElement.contentWindow?.postMessage(data, this.iframeDomain);
    }

    handlePostMessageFromIFrame(event: MessageEvent) {
        // TODO: insert whatever logic to handle each type of expected postmessage sent by iframe
        console.log('parent received post message with event: ', event);
    }

}

export default YourStakeEmbed;