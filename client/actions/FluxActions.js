import Dispatcher from '../dispatcher/FluxDispatcher.js'
import Constants from '../constants/FluxConstants.js'
import api from '../api/api.js'

const NoteActions = {
	loadNotes(){
		Dispatcher.dispatch({
			type: Constants.LOAD_NOTES_REQUEST
		})

		api.listNote()
			.then(({ data }) => {
				Dispatcher.dispatch({
					type: Constants.LOAD_NOTES_SUCCESS,
					notes: data
				})
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
	}

	deleteNote(noteId){
		api.deleteNote(noteId)
			.then(()=>{
				this.loadNotes()
			})
			.catch(err => l(err))
	}
}