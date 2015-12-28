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

  if (process.env.NODE_ENV === 'development') {
    const config = require(root + '/webpack.config.dev.js')
    const compiler = require('webpack')(config)
    app.use(require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        colors: true
      }
    }))
    app.use(require('webpack-hot-middleware')(compiler))
  }

  app.set('view engine', 'jade')
  app.set('views', root + '/templates')
  app.use('/static', express.static('build'))
	//app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({
	  extended: true
	}))

  app.get('/', (req, res) => {
    res.render('index', {
      assets: require(root + '/webpack-assets'),
      dev: process.env.NODE_ENV === 'development'
    })
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
