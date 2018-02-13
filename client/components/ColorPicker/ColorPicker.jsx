import React from 'react'
import './ColorPicker.less'

const l = console.log

class ColorPicker extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			colors : this.props.colors,
			selected : this.props.colorNum,
		}

		this.handleSelectColor = this.handleSelectColor.bind(this)
	}

	componentDidMount(){
		this.elements && this.elements.forEach((el, i) =>{
			el.style['background-color'] = this.state.colors[i]
			el.color = this.state.colors[i]
		})
	}

	handleSelectColor(e){
		if(this.state.selected == e.target) return

		this.props.onColorClick(e)
	}

	componentWillReceiveProps(props){
		this.setState( (prev, next) => {
			return{
				selected: next.colorNum
			}
		})
	}


	render(){
		var selected = this.state.selected

		return (
			<div className="ColorPicker">
				{this.state.colors.map( (color,i) => {
					return (	
						<div className={
								i == this.state.selected ? "ColorPicker__color ColorPicker__color--selected"
								: "ColorPicker__color" }
							key={i} 
							ref={ el => {
								if(!this.elements) this.elements = []
								this.elements.push(el)
								if(el) el.key = i
							}}
							onClick = {this.handleSelectColor}
						/>)
				})}
			</div>
		)
	}
}

module.exports = ColorPicker