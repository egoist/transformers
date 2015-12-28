import jade from 'jade'

export default function (req, res) {
  const code = req.body.code
  try {
    const fn = jade.compile(code)
    res.json({
      code: fn()
    })
  } catch(err) {
    res.json({
      error: true,
      message: err.stack
    })
  }
}
