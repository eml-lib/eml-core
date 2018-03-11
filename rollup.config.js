import commonJs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    output: {
        file: 'build.js',
        format: 'cjs'
    },
    plugins: [
        nodeResolve(),
        commonJs({
            include: 'node_modules/**'
        }),
        babel({
            exclude: 'node_modules/**',
            presets: [
                ['env', {
                    modules: false
                }],
                'stage-3'
            ],
            plugins: [
                'external-helpers',
                ['transform-react-jsx', {
                    pragma: 'createElement'
                }]
            ],
        }),
    ],
    external: [
        // 'xml-js' needs
        'stream',
        'string_decoder'
    ],
    watch: {
        include: 'src/**/*.js',
        exclude: 'node_modules/**'
    }
}