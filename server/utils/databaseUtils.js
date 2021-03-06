import mongoose from 'mongoose'
import { db } from '../../etc/config.json'
import '../models/note.js'

const Note = mongoose.model('Note')

export function tryConnectToDatabase(){
	return mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`)
}

export function getNotes(){
	return Note.find()
}

export function addNote(data){
	const note = new Note({
		title 		: 	data.title,
		text		:	data.text,
		color		:	data.color,
		createdDate : 	new Date()
	})

	return note.save()
}

export function deleteNote(id){
	return Note.findById(id).remove()
}

export function connectToDatabase(){
	tryConnectToDatabase()
		.then( 
			resolve => {
				l('connected to database')
			},
			err => {
				//l('error  :', err)
				l('error connect to database')
				setTimeout(connectToDatabase, 1000)
			}
		)
}