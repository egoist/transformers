import compile from 'css-whitespace'

export default function (req, res) {
  let code = req.body.code
  try {
    code = compile(
      decodeURIComponent(
        encodeURIComponent(code).replace(/\%5Cn/g, '%0A')
      )
    )
    res.json({
      code
    })
  } catch (err) {
    res.json({
      error: true,
      message: err.stack
    })
  }
}
