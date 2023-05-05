import getUrlForIFramePage from "./iframe-routes";

interface YourStakeEmbedArgs {
    clientKey: string
    authCode: string
    targetElementIdentifier: string
    initialPage: string
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
    currentPage: string;

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
        this.iframeElement.src = getUrlForIFramePage(this.currentPage);
        this.iframeElement.style.width = width;
        this.iframeElement.style.height = height;

        this.targetElement = document.getElementById(targetElementIdentifier) as HTMLElement;
        this.targetElement.appendChild(this.iframeElement);

    }
}

export default YourStakeEmbed;