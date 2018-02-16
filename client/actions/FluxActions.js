import Dispatcher from '../dispatcher/FluxDispatcher.js'
import Constants from '../constants/FluxConstants.js'
import api from '../api/api.js'

const NoteActions = {
	loadNotes(){
		l('loadNotes : ')
		Dispatcher.dispatch({
			type: Constants.LOAD_NOTES_REQUEST
		})

		api.listNotes()
			.then(({ data }) => {
				Dispatcher.dispatch({
					type: Constants.LOAD_NOTES_SUCCESS,
					notes: data
				})

				l(data)
			}) 
			.catch(err => {
				Dispatcher.dispatch({
					type: Constants.LOAD_NOTES_FAIL,
					error: err
				})
			})
	},

	createNote(note){
		api.createNote(note)
			.then(() => this.loadNotes())
			.catch(err => l(err))
	},

	deleteNote(noteId){
		l('noteId : ', noteId)
		api.deleteNote(noteId)
			.then(()=>{
				this.loadNotes()
			})
			.catch(err => l(err))
	}
}


export default NoteActions