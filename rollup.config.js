import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { list as babelHelpersList } from 'babel-helpers';
// import dom from './lib/dom';

export default {
	input: 'index.js',
	output: {
		file: 'build.js',
		format: 'cjs'
	},
	plugins: [
		// resolve(),
		babel({
			exclude: 'node_modules/**',
			presets: [
				['env', {
					modules: false
				}],
				'stage-3'
			],
			plugins: [
				'external-helpers'
			],
			// fixing temporary rollup's regression, remove when https://github.com/rollup/rollup/issues/1595 gets solved
			externalHelpersWhitelist: babelHelpersList.filter(helperName => helperName !== 'asyncGenerator'),
		})
	],
	watch: {
		include: ['*.js'],
		exclude: 'node_modules/**'
	}
}
