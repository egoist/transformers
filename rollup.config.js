import babel from 'rollup-plugin-babel'

export default {
	entry: './src/index',
	dest: 'server.js',
	plugins: [
		babel({
			exclude: 'node_modules/**',
			presets: ['es2015-rollup', 'stage-0'],
			plugins: ['transform-runtime']
		})
	],
	format: 'cjs'
}