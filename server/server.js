global.l = console.log

import express from 'express'
import bodyParser from 'body-parser'
import { serverPort } from '../etc/config.json'
import * as bd from './utils/databaseUtils.js'

bd.connectToDatabase()

const app = express()
app.use( bodyParser.json() )

app.use((req, res, next) => {
	l(req.method, req.url)
	next()
})

var server = app.listen(serverPort, () => {
	l('server is runned on port : ', serverPort)
})