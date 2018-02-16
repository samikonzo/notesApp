global.l = console.log

import express from 'express'
import bodyParser from 'body-parser'
import { serverPort } from '../etc/config.json'
import * as db from './utils/databaseUtils.js'

db.connectToDatabase()

const app = express()
app.use( bodyParser.json() )

app.use((req, res, next) => {
	l(req.method, req.url)
	next()
})

app.get('/notes', (req, res) => {
	db.getNotes()
		.then(
			data => {
				res.send(JSON.stringify(data))
			}
		)
})

app.post('/addNote', (req, res) => {
	l(req.body)
	db.addNote(req.body)
		.then(item => res.send(JSON.stringify(item)))
})

app.delete('/deleteNote:id', (req, res) =>{
	db.deleteNote(req.params.id)
		.then(() => l('removed'))
})


var server = app.listen(serverPort, () => {
	l('server is runned on port : ', serverPort)
})



