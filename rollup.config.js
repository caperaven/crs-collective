import { terser } from "rollup-plugin-terser";

export default {
    input: "src/index.js",
    output: [
        {file: 'dist/index.min.js', format: 'cjs'},
        {file: 'dist/index.esm.js', format: 'es'}
    ],
    plugins: [
        terser()
    ]
};