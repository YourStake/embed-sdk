
const IFramePageRoutes = {
    'report-builder': '/advisor-dashboard/reports/'
};
export type IFramePageKey = keyof typeof IFramePageRoutes;

export const getUrlForIFramePage = (pageKey: IFramePageKey) => {
    const domain = 'https://localhost:8443'; // TODO: make this work for whatever environment the script is being built for
    const route = IFramePageRoutes[pageKey];
    if (!route) {
        throw new Error(`Invalid page key: ${pageKey}`);
    }
    return domain + route;
};

