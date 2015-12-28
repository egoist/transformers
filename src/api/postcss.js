import postcss from 'postcss'

export default async function (req, res) {
  const code = req.body.code
  const plugins = [
    require('precss')
  ]
  try {
    const result = await postcss(plugins).process(code)
    res.json({
      code: result.css
    })
  } catch(err) {
    res.json({
      error: true,
      message: err.stack
    })
  }
}
