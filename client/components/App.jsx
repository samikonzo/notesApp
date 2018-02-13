import React from 'react'
import './App.less'
import NoteEditor from './NoteEditor/NoteEditor.jsx'
import NotesGrid from './NotesGrid/NotesGrid.jsx'

global.l = console.log;

class App extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			notes : [],
			colors: [
				'white',
				'#362247',
				'#695883',
				'#bcb4ba',
				'#debea0',
				'#a4545f'
			]
		}

		this.handleNoteAdd = this.handleNoteAdd.bind(this)
		this.handleNoteDelete = this.handleNoteDelete.bind(this)

	}

	handleNoteAdd(note){
		l(note)

		var notes = this.state.notes
		notes.push(note)

		this.setState({
			notes: notes
		})

		//add server request
		var xhr = new XMLHttpRequest()
		xhr.open('POST', '/api/addNote')
		xhr.send(JSON.stringify(note))
	}

	handleNoteDelete(e){

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