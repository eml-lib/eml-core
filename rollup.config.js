import commonJs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: 'index.js',
    output: {
        file: 'build.js',
        format: 'cjs'
    },
    plugins: [
        commonJs({
            include: 'node_modules/**'
        }),
        nodeResolve({
            preferBuiltins: false
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
            ]
        }),
    ],
    external: [
        // TODO: Change xml-parser to another parser who doesn't use node's built-ins
        'tty', 'util', 'fs', 'net'
    ],
    watch: {
        include: ['index.js', 'lib/**/*.js'],
        exclude: 'node_modules/**'
    }
}
