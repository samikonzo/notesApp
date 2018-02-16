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
		this.getNotes = this.getNotes.bind(this)

		this.getNotes()
	}

	handleNoteAdd(note){
		l(note)

		var that = this

		//add server request
		var xhr = new XMLHttpRequest()
		xhr.open('POST', '/api/addNote')
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(JSON.stringify(note))

		xhr.onload = function(){
			var item = JSON.parse(this.response)
			var notes = that.state.notes
			notes.push(item)

			that.setState({
				notes: notes
			})
		}
	}

	handleNoteDelete(note){
		//add server request
		l(note)
		var xhr = new XMLHttpRequest()
		xhr.open('DELETE', '/api/deleteNote' + note.id)
		xhr.send()
		note.remove()
		//note.delete()
	}

	getNotes(){
		var xhr = new XMLHttpRequest
		var that = this
		xhr.open('GET', '/api/notes')
		xhr.send()

		xhr.onload = function(){
			var notes = JSON.parse(this.response)
			that.setState({
				notes: notes
			})
		}
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