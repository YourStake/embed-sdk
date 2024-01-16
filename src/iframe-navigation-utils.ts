
// during the build __YS_IFRAME_DOMAIN__ is replaced with the proper yourstake domain for the environment.
// this is configured in the "define" section in vite.config.ts. For more on global constant replacements see https://vitejs.dev/config/shared-options.html#define
export const IFRAME_DOMAIN = '__YS_IFRAME_DOMAIN__';

const IFramePageRoutes = {
    'report-builder': '/ui/embed/reports/',
    'values-picker' : '/ui/visitor/wizard',
    'behavioral-questionnaire': '/questionnaire/intro/',
};
export type IFramePageKey = keyof typeof IFramePageRoutes;

export const getUrlForIFramePage = (pageKey: IFramePageKey, slug: string, params: {[key: string]: string}) => {
    const route = IFramePageRoutes[pageKey];
    if (!route) {
        throw new Error(`Invalid page key: ${pageKey}`);
    }
    
    params.is_embed = '1';
    const paramStrings = Object.keys(params).map((key) => `${key}=${params[key]}`);

    return [
        IFRAME_DOMAIN,
        route,
        slug ? `${slug}/` : '',
        paramStrings.length ? '?' : '',
        paramStrings.join('&'),
    ].join('');
};

