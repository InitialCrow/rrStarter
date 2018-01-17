'use strict'
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
let HappyPack = require('happypack');
let webpack = require('webpack');
let path = require('path');

const config =  {
	context: path.join(__dirname, 'app'),
	entry: ['./ressources/js/index.js'],
	output: {
		filename: 'index.js',
		path: path.join(__dirname, 'dist/ressources/js/'),
		pathinfo: true
  
 	},
 	watch: false,
 module: {
 	rules: [
      		{test: /\.(js)$/, include: path.resolve(__dirname, "app/ressources/js"), exclude: /node_modules/, use: 'happypack/loader'}
   	]
},
plugins: [
	 new HappyPack({
      loaders: [ 'babel-loader' ]
    }),
	//copy plugin
	new CopyWebpackPlugin([


		// {output}/to/file.txt 
		{ from: '.config.js', to: __dirname+'/dist'},
		{ from: 'ressources/css/**/*', to: __dirname+'/dist'},
		{ from: 'ressources/assets/**/*', to: __dirname+'/dist'},
		{ from: 'controllers/*', to: __dirname+'/dist'},
		{ from: 'models/*', to: __dirname+'/dist'},
		{ from: 'views/**/*', to: __dirname+'/dist'},
		{ from: 'server.js', to: __dirname+'/dist'},

	],
	{


		// By default, we only copy modified files during 
		// a watch or webpack-dev-server build. Setting this 
		// to `true` copies all files. 
		copyUnmodified: false
	}),
	
	new webpackUglifyJsPlugin({
		cacheFolder: path.resolve(__dirname, ".cached_uglify/"),
		debug: true,
		minimize: true,
		sourceMap: false,
		output: {
			comments: false
		},
		compressor: {
		 	warnings: false
		}

	}),
	new webpack.DefinePlugin({
	  'process.env.NODE_ENV': JSON.stringify('production')
	})

]
}
module.exports = config;

