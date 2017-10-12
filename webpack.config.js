'use strict'
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
let webpack = require('webpack');
let path = require('path');

const config =  {
	context: path.join(__dirname, 'app'),
	entry: ['./ressources/js/index.jsx'],
	output: {
		filename: 'index.js',
		path: path.join(__dirname, 'dist/ressources/js/'),
  
 	},
 module: {
 	rules: [
      		{test: /\.(js|jsx)$/, use: 'babel-loader'}
   	]
},

plugins: [
	//copy plugin
	new CopyWebpackPlugin([


		// {output}/to/file.txt 
		{ from: './.config.js', to: __dirname+'/dist'},
		{ from: './ressources/css/**/*', to: __dirname+'/dist'},
		{ from: './ressources/assets/**/*', to: __dirname+'/dist'},
		{ from: './controllers/*', to: __dirname+'/dist'},
		{ from: './models/*', to: __dirname+'/dist'},
		{ from: './views/**/*', to: __dirname+'/dist'},
		{ from: './server.js*', to: __dirname+'/dist'},

	],
	{


		// By default, we only copy modified files during 
		// a watch or webpack-dev-server build. Setting this 
		// to `true` copies all files. 
		copyUnmodified: true
	}),
	//uglyfile plugin
	// new webpackUglifyJsPlugin({
	// 	cacheFolder: path.resolve(__dirname, ".cached_uglify/"),
	// 	debug: true,
	// 	minimize: true,
	// 	sourceMap: false,
	// 	output: {
	// 		comments: false
	// 	},
	// 	compressor: {
	// 	 	warnings: false
	// 	}

	// }),
	new webpack.DefinePlugin({
	  'process.env.NODE_ENV': JSON.stringify('production')
	}),
	new webpack.optimize.UglifyJsPlugin()

]
}
module.exports = config;

