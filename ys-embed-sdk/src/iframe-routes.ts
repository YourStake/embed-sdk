
const IFramePageRoutes: {[pageKey: string]: string} = {
    'report-builder': '/advisor-dashboard/reports/'
};

const getUrlForIFramePage = (pageKey: string) => {
    const domain = 'http://localhost:8443'; // TODO: make this work for whatever environment the script is being built for
    const route = IFramePageRoutes[pageKey];
    if (!route) {
        throw new Error(`Invalid page key: ${pageKey}`);
    }
    return domain + route;
};

export default getUrlForIFramePage;
