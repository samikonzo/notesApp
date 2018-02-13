var webpack = require('webpack')

module.exports = {
	entry:{
		main : "./client/main.jsx",
		main2 : "./client/main2.jsx"
	},
	output:{
		path : __dirname + "/public/build",
		publicPath : 'build/',
		filename: '[name]-bundle.js'
	},	
	module:{
		rules : [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [/node_modules/, /public/]
			},
			{
				test: /\.css$/,
				use : [
					'style-loader',
					'css-loader',
					'postcss-loader'
				],
				exclude: [/node_modules/, /public/]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'less-loader'
				],
				exclude: [/node_modules/, /public/]
			},
			{
				test: /\.jsx$/,
				use : [
					'react-hot-loader/webpack',
					{
						loader: 'babel-loader',
						options: {
							presets:["env", "react"]
						}
					}
				],
				exclude: [/node_modules/, /public/]
			}
		]
	},
	devServer: {
		proxy: {
			'/api' : {
				target: 'http://localhost:3000',
				pathRewrite: {'^/api' : ''}
			}
		}
	}
}
