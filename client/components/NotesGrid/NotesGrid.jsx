import React from 'react'
import Note from '../Note/Note.jsx'
import './NotesGrid.less'



class NotesGrid extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return( 
			<div className='NotesGrid'>
		 		{	this.props.notes.map((note, i)=> {
			 			return (
			 				<Note 
			 					key={i}
			 					note={note}
			 					onNoteDelete = {this.props.onNoteDelete}
			 				/>
			 			)
		 		})}
		 	</div>	
		)
	}
}

module.exports = NotesGrid