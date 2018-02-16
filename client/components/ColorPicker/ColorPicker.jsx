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
		var colors = arraySplitBy4(this.state.colors)

		return (
			<div className="ColorPicker">
				{colors.map((colorsArr, i) => {
					return(
						<div className="ColorPicker__group" key={i}>
							{colorsArr.map((color, j) => {

								var currentColorNum = i*4 + j
								var isSelected = currentColorNum == selected
								var currentClassName = isSelected ? "ColorPicker__color ColorPicker__color--selected" : "ColorPicker__color"

								return(
									<div className={currentClassName}
										key={currentColorNum}
										ref={el => {
											if(!this.elements) this.elements = []
											this.elements.push(el)
											if(el) el.key = currentColorNum
										}}
										onClick = {this.handleSelectColor}
									/>
								)
							})}
						</div>
					)
				})}


			</div>
		)
	}
}

function arraySplitBy4(arr){
	var arrCopy = arr.slice()
	var resultArr = [];

	while(arrCopy.length){
		resultArr.push(arrCopy.splice(0,4))
	}

	return resultArr
}


module.exports = ColorPicker