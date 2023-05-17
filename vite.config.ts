import fs from 'fs'
import { defineConfig } from 'vite'

export default defineConfig(({mode}) => {
    const iframeDomain = {
        'production': 'https://www.yourstake.org',
        'development': 'https://localhost:8443',
    }[mode];

    return {
        build: {
            rollupOptions: {
                input: 'src/main.ts',
                output: {
                    dir: 'dist',
                    inlineDynamicImports: true,
                    entryFileNames: 'yourstake-embed-sdk.js',
                    format: 'es',
                    sourcemap: 'inline',
                    name: 'YourStakeEmbed',
                },
            }
        },
        plugins: [
            {
                name: 'copy-bundle-to-mock-embed-app-when-local',
                closeBundle: async () => {
                    if (mode === 'development') {
                        fs.copyFile(
                            'dist/yourstake-embed-sdk.js',
                            '../embed-mock-app/frontend/src/assets/yourstake-embed-sdk.js',
                            (error) => {
                                if (error) {
                                    console.error('Error while copying bundle to mock embed app: ', error);
                                    throw error;
                                } else {
                                    console.log('Copied bundle file to mock embed app');
                                }
                            }
                        );
                    }
                },
            }
        ],
        server: {
            port: 7173,
        },
        define: {
            __YS_IFRAME_DOMAIN__: iframeDomain,
        }
    };
});
