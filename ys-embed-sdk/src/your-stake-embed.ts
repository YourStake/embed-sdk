import { getUrlForIFramePage, IFramePageKey } from "./iframe-routes";

interface YourStakeEmbedArgs {
    clientKey: string
    authCode: string
    targetElementIdentifier: string
    initialPage: IFramePageKey
    width: string
    height: string
    onLoad: Function | null
    onError: Function | null
}

class YourStakeEmbed {
    clientKey: string;
    authCode: string;
    targetElement: HTMLElement;
    iframeElement: HTMLIFrameElement;
    currentPage: IFramePageKey;

    constructor({
        clientKey,
        authCode,
        targetElementIdentifier,
        initialPage='report-builder',
        width,
        height,
        // onLoad=null,
        // onError=null,
    }: YourStakeEmbedArgs) {
        // todo: auth
        this.clientKey = clientKey;
        this.authCode = authCode;

        this.currentPage = initialPage;
        this.iframeElement = document.createElement('iframe');
        this.iframeElement.id = 'yourstake-embedded-iframe';
        this.resizeIframe(width, height);
        this.setIframePage(this.currentPage);

        this.targetElement = document.getElementById(targetElementIdentifier) as HTMLElement;
        this.targetElement.appendChild(this.iframeElement);

        window.addEventListener("message", (event) => {
            // TODO validate the message from the iframe
            this.handlePostMessageFromIFrame(event);
        });
    }
    resizeIframe(width: string, height: string) {
        // TODO add some validation to make sure these values are valid
        this.iframeElement.style.width = width;
        this.iframeElement.style.height = height;
    }
    setIframePage(pageKey: IFramePageKey) {
        // TODO check that the specified page is a valid page which the user is authorized to load
        this.currentPage = pageKey;
        this.iframeElement.src = getUrlForIFramePage(this.currentPage);
    }

    sendPostMessageToIFrame(data: Object) {
        // TODO structure and validate this
        this.iframeElement.contentWindow?.postMessage(data);
    }

    handlePostMessageFromIFrame(event: MessageEvent) {
        // TODO: insert whatever logic to handle each type of expected postmessage sent by iframe
        console.log('parent received post message with event: ', event);
    }
}

export default YourStakeEmbed;