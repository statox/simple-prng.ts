import typescript from '@rollup/plugin-typescript';

/*
 * Rollup is used to bundle the package as a UMD module.
 * `dist/simple-prng.umd.js` is used when importing in a browser to create
 * a global object `SimplePRNG`
 * In other environments supporting modules like nodeJS we can use `import`
 * or `require` as usual.
 */
export default {
    input: 'index.ts',
    output: [
        {
            file: 'dist/simple-prng.esm.js',
            format: 'es'
        },
        {
            file: 'dist/simple-prng.cjs',
            format: 'cjs'
        },
        {
            file: 'dist/simple-prng.umd.js',
            format: 'umd',
            name: 'SimplePRNG'
        }
    ],
    plugins: [typescript()]
};
