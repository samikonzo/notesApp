import React from 'react'
import './Note.less'

class Note extends React.Component{
	constructor(props){
		super(props)

		/*
			split text by \n 
		*/
		var text = this.props.note.text.split('\n')


		this.state = {
			title: this.props.note.title,
			color: this.props.note.color,
			text : text
		}

		this.noteDelete = this.noteDelete.bind(this)
	}

	componentDidMount(){
		this.note.style['background-color'] = this.props.note.color 
	}

	noteDelete(e){
		var note = this.note
		this.props.onNoteDelete(note)
	}

	render(){
		l(this.state.text)
		return (
			<div 
				className="Note"
				ref={note => this.note = note}
			>
				<div className="Note__title">{this.state.title}</div>
				<div className="Note__text">
					{this.state.text.map((str, key) => {
						return <div key={key}>{str}</div>
					})}
				</div>
				<div className="Note__remove-btn" onClick={this.noteDelete}></div>
			</div>
		)
	}
}

module.exports = Note