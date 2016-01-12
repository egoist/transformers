import express from 'express'
const app = express()
import bodyParser from 'body-parser'
import babel from './api/babel'
import postcss from './api/postcss'
import jade from './api/jade'
import curlyCSS from './api/curlycss'

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

export default function server (root) {
  app.set('view engine', 'jade')
  app.set('views', root + '/templates')
  app.use('/static', express.static('build'))
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({
	  extended: true
	}))

  app.get('/', (req, res) => {
    res.send('ok')
  })
	app.post('/api/babel', expectCode, babel)
  app.post('/api/postcss', expectCode, postcss)
  app.post('/api/jade', expectCode, jade)
  app.post('/api/curlycss', expectCode, curlyCSS)

	const port = app.get('port') || 3003
	app.listen(port, () => {
		console.log('Transformers are fighting at http://localhost:' + port)
	})
}
