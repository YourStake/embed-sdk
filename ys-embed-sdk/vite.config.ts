import { resolve } from 'path'
import { defineConfig } from 'vite'
let _ = defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'YourStakeEmbed',
            fileName: 'yourstake-embed-sdk-v1',
            formats: ['es'],
        },
        // rollupOptions: {
        //     input: 'src/main.ts',
        //     output: {file: 'dist/hi.js', format: 'es', sourcemap: "inline"},
        //     // output: {
        //     //     file: 'yourstake-embed-sdk-v1.js',
        //     //     format: "es",
        //     //     name: 'YourStakeEmbed',
        //     // }
        // }
    },
    server: {
        port: 7173,
    }
});
// console.log("_: ", _.build.rollupOptions.output);

export default _;
