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
			text : text,
			id : this.props.note._id,
			date: this.props.note.createdDate,
		}

		this.noteDelete = this.noteDelete.bind(this)
	}

	componentDidMount(){
		this.note.style['background-color'] = this.props.note.color 
	}

	componentWillReceiveProps(props){
		/*this.setState( (prev, next) => {
			l(next)
		})*/
	}

	noteDelete(e){
		var note = this.note
		note.id = this.props.note.id
		this.props.onNoteDelete(note)
	}

	render(){
		return (
			<div 
				className="Note"
				ref={note => {
					this.note = note
				}}
				_id={this.state.id}
			>
				<div className="Note__title">{this.state.title}</div>
				<div className="Note__text">
					{this.state.text.map((str, key) => {
						return <div key={key}>{str}</div>
					})}
				</div>
				<div className="Note__remove-btn" onClick={this.noteDelete}>X</div>
			</div>
		)
	}
}

module.exports = Note