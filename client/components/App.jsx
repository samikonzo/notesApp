import React from 'react'
import NoteEditor from './NoteEditor/NoteEditor.jsx'
import NotesGrid from './NotesGrid/NotesGrid.jsx'
import NotesStore from '../stores/NotesStore.js'
import NoteActions from '../actions/FluxActions.js'
import './App.less'

global.l = console.log;

const colors = [
				'white',
				'#362247',
				'#695883',
				'#bcb4ba',
				'#debea0',
				'#a4545f',
				'#a65ee3',
				'#ff2365'
			]



function getStateFromFlux(){
	return{
		isLoading: NotesStore.isLoading(),
		notes: NotesStore.getNotes()
	}
}


class App extends React.Component{
	constructor(props){
		super(props)

		this.state = Object.assign(
			{colors: colors},
			getStateFromFlux())

		this.handleNoteAdd = this.handleNoteAdd.bind(this)
		this.handleNoteDelete = this.handleNoteDelete.bind(this)
		this.componentDidMount = this.componentDidMount.bind(this)	
		this.componentWillUnmount = this.componentWillUnmount.bind(this)
		this._onChange = this._onChange.bind(this)
	}

	handleNoteAdd(note){
		NoteActions.createNote(note)
	}

	handleNoteDelete(note){
		NoteActions.deleteNote(note.id)
	}

	componentWillMount(){
		NoteActions.loadNotes()
	}

	componentDidMount(){
		NotesStore.addChangeListener(this._onChange)
	}

	componentWillUnmount(){
		NotesStore.removeChangeListener(this._onChange)
	}

	_onChange(){
		this.setState(getStateFromFlux())
	}

	render(){
		return (
			<div className="App">
				<h1 className="App__header"> Notes app</h1>
				<NoteEditor 
					onNoteAdd={this.handleNoteAdd} 
					colors={this.state.colors}
				/>
				<NotesGrid 
					notes={this.state.notes} 
					onNoteDelete={this.handleNoteDelete}
				/>
			</div>

		)
	}
}

module.exports = App