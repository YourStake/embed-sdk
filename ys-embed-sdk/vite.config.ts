import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'YourStakeEmbed',
            fileName: 'yourstake-embed-sdk-v1',
            formats: ['es'],
        },
    },
    server: {
        port: 7173,
    }
});