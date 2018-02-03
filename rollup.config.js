import commonJs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const baseConfig = {
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
            ]
        }),
    ],
    watch: {
        include: 'src/**/*.js',
        exclude: 'node_modules/**'
    }
};

const fileConfigs = [
    {
        inputFileName: 'index.js',
        outputFileName: 'build.js'
    },
    // 'create-element.js',
    // 'create-fragment.js'
];

export default fileConfigs.map(fileConfig => Object.assign({}, baseConfig, {
    input: 'src/' + fileConfig.inputFileName,
    output: {
        file: fileConfig.outputFileName,
        format: 'cjs'
    }
}));