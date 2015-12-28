import * as babel from 'babel-core'

export default function (req, res) {
	const code = req.body.code
	if (!code) {
		return res.json({
			error: true,
			message: 'Expected <code> field but not found'
		})
	}
  const babelOpts = {
    presets: ['es2015'],
    plugins: []
  }
  if (req.body.experimental) {
    babelOpts.presets.push('stage-0')
    babelOpts.plugins.push('transform-runtime')
  }
  if (req.body.react) {
    babelOpts.presets.push('react')
  }
	try {
    const result = babel.transform(code, babelOpts)
    res.json({
      code: result.code
    })
  } catch(err) {
    res.json({
      error: true,
      message: err.stack
    })
  }
}
