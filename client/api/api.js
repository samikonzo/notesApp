import axios from 'axios'
import { apiPrefixer } from '../../etc/config.json' 

export default  {
	listNotes(){
		return axios.get(`${apiPrefixer}/notes`)
	},

	createNote(note){
		return axios.post(`${apiPrefixer}/notes`, note)
	},

	deleteNote(noteId){
		return axios.delete(`${apiPrefixer}/notes/${noteId}`)
	}

}