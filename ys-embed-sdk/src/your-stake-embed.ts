import getUrlForIFramePage from "./iframe-routes";

class YourStakeEmbed {
    clientKey: string;
    authCode: string;
    targetElement: HTMLElement;
    iframeElement: HTMLIFrameElement;
    currentPage: string;

    constructor(
        clientKey: string,
        authCode: string,
        targetElementIdentifier: string,
        initialPage: string = 'report-builder',
        // onLoad: Function | null,
        // onError: Function | null,

        ) {
        // todo: auth
        this.clientKey = clientKey;
        this.authCode = authCode;

        this.currentPage = initialPage;

        this.iframeElement = document.createElement('iframe');
        this.iframeElement.id = 'yourstake-embedded-iframe';
        this.iframeElement.src = getUrlForIFramePage(this.currentPage);
        this.targetElement = document.getElementById(targetElementIdentifier) as HTMLElement;
        this.targetElement.appendChild(this.iframeElement);        

    }
}

export default YourStakeEmbed;