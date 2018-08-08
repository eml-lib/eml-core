// import path from 'path';
import json from 'rollup-plugin-json';
import commonJs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
// import inject from 'rollup-plugin-inject';

export default {
    input: 'src/index.js',
    output: {
        name: 'eml',
        file: 'build.js',
        format: 'es'
    },
    plugins: [
		json({
			include: 'node_modules/**',
			preferConst: true
		}),
        // Changes package path to relative
        nodeResolve(/*{
			preferBuiltins: true
		}*/),
        // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
        commonJs({
            include: 'node_modules/**'
        }),
        babel({
            exclude: 'node_modules/**'
        }),
        // globals(),
        // builtins()
    ],
    watch: {
        include: 'src/**/*.js',
        exclude: 'node_modules/**'
    }
}
