import express from 'express'
const app = express()
import bodyParser from 'body-parser'
import babel from './api/babel'
import postcss from './api/postcss'

function expectCode (req, res, next) {
  const code = req.body.code
  if (!code) {
    res.json({
      error: true,
      message: 'Expected <code> field but not found'
    })
  } else {
    next()
  }
}

export default function server () {

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({
	  extended: true
	}))

	app.post('/api/babel', expectCode, babel)
  app.post('/api/postcss', expectCode,postcss)

	const port = app.get('port') || 3003
	app.listen(port, () => {
		console.log('Transformers are fighting at http://localhost:' + port)
	})
}
