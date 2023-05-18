
// during the build __YS_IFRAME_DOMAIN__ is replaced with the proper yourstake domain for the environment.
// this is configured in the "define" section in vite.config.ts. For more on global constant replacements see https://vitejs.dev/config/shared-options.html#define
export const IFRAME_DOMAIN = '__YS_IFRAME_DOMAIN__';

const IFramePageRoutes = {
    'report-builder': '/ui/embed/reports/'
};
export type IFramePageKey = keyof typeof IFramePageRoutes;

export const getUrlForIFramePage = (pageKey: IFramePageKey) => {
    const route = IFramePageRoutes[pageKey];
    if (!route) {
        throw new Error(`Invalid page key: ${pageKey}`);
    }
    return IFRAME_DOMAIN + route + '?is_embed=1';
};

