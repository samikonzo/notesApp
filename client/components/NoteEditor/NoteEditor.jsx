import React from 'react'
import ColorPicker from '../ColorPicker/ColorPicker.jsx'
import './NoteEditor.less'

class NoteEditor extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			title: '',
			text: '',
			color: '#FFFFFF',
			colorNum: 0,
			colors: this.props.colors,
		}

		this.handleTextChange = this.handleTextChange.bind(this)
		this.handleTitleChange = this.handleTitleChange.bind(this)
		this.handleNoteAdd = this.handleNoteAdd.bind(this)	
		this.handleColorChange = this.handleColorChange.bind(this)	
	}

	handleTextChange(e){
		this.setState({
			text: e.target.value
		})
	}

	handleTitleChange(e){
		this.setState({
			title: e.target.value
		})
	}

	handleColorChange(e){
		l(e.target.key)
		this.setState({
			color: e.target.color,
			colorNum: e.target.key,
		})
	}
	
	handleNoteAdd(){
		const newNote = {
			title: this.state.title,
			text: this.state.text,
			color: this.state.color
		}

		this.props.onNoteAdd(newNote)
		
		this.setState({
			title: '',
			text: '',
			colorNum: 0
		})
	}


	render(){
		return(
			<div className="NoteEditor"> 
				<input
					type='text'
					className="NoteEditor__title"
					placeholder="enter title"
					value={this.state.title}
					onChange={this.handleTitleChange}
				/>

				<textarea
					placeholder="enter note text"
					rows={5}
					className="NoteEditor__text"
					value={this.state.text}
					onChange={this.handleTextChange}
					ref={textarea => this.textarea = textarea}
				/>

				<div className="NoteEditor__footer">
					<ColorPicker
						colors={this.state.colors} 
						colorNum={this.state.colorNum}
						onColorClick={this.handleColorChange}
					></ColorPicker>

					<button
						className="NoteEditor__submitBtn"
						disabled={!this.state.text}
						onClick={this.handleNoteAdd}
					> 
						Add 
					</button>
				</div>


			</div>
		)	
	}
}

module.exports = NoteEditor