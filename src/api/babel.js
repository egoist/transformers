import * as babel from 'babel-core'

export default function (req, res) {
	const code = req.body.code
	if (!code) {
		return res.json({
			error: true,
			message: 'Expected <code> field but not found'
		})
	}
	const result = babel.transform(code, {
		presets: ['es2015', 'stage-0', 'react'],
		plugins: ['transform-runtime']
	})
	res.json({
		code: result.code
	})
}