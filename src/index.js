import express from 'express'
const app = express()
import bodyParser from 'body-parser'
import babel from './api/babel'



export default function server () {

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({
	  extended: true
	}))

	app.post('/api/babel', babel)

	const port = app.get('port') || 3003
	app.listen(port, () => {
		console.log('Transformers are fighting at http://localhost:' + port)
	})
}