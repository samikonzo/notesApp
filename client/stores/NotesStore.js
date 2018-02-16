import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher/FluxDispatcher.js'
import Constants from '../constants/FluxConstants.js'

const CHANGE_EVENT = 'change'

let _notes = []
let _loadingError = null
let _isLoading = true

function formatNote(note) {
	return{
		id: note._id,
		title: note.title,
		text: note.text,
		color: note.color || '#ffffff',
		createdDate: note.createdDate
	}
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
	isLoading(){
		return _isLoading
	},

	getNotes(){
		return _notes
	},

	emitChange(){
		this.emit(CHANGE_EVENT)
	},

	addChangeListener(f){
		this.on(CHANGE_EVENT, f)
	},

	removeChangeListener(f){
		this.removeListener(CHANGE_EVENT,f)
	}
})

Dispatcher.register(function(action){
	switch(action.type){
		case Constants.LOAD_NOTES_REQUEST : {
			_isLoading = true

			TasksStore.emitChange()
			break
		}

		case Constants.LOAD_NOTES_SUCCESS : {
			_isLoading = false
			_notes = action.notes.map( formatNote )
			_loadingError = null
			
			TasksStore.emitChange() 
			break
		}

		case Constants.LOAD_NOTES_FAIL : {
			_loadingError = action.error

			TasksStore.emitChange()
			break
		}

		default: {
			console.log(' No such handler')
		}
	}
})

export default TasksStore