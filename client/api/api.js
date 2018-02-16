import axios from 'axios'
import { apiPrefixer } from '../../etc/config.json' 

module.exports = {
	listNotes(){
		return axios.get(`${apiPrefixer}/notes`)
	},

	createNote(note){
		return axios.post(`${apiPrefixer}/notes`, data)
	},

	deleteNote(noteId){
		return axios.delete(`${apiPrefixer}/notes${noteId}`)
	}

}