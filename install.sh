#!/bin/sh
# install my redux app

echo "WELCOME YOU WILL CREATE REDUX APP ..."
echo ""

if [ $(dpkg-query -W -f='${Status}' tree 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  echo "--> need tree for this script downloading ..."
  sudo apt-get install tree;
fi

echo "Choose you install first ..."
echo ""
echo "--> Do you want install with orm and framework version (y/n) (require nodejs and npm) ?"

read framework

if echo "$framework" | grep -iq "^y";then
	echo "--> installing express ..."
	echo ""
	npm init
	echo "--> package ready, installing..."
	echo ""
	npm install express --save
	npm install ejs --save
	npm install body-parser --save
	npm install dotenv --save
	npm install nodemon -g --save
  npm install npm-run-all --save
	echo ""
	echo "express was installed! "
	echo ""
	echo "--> installing react & redux..."
	echo ""
	npm install react --save
	npm install react-dom --save
	npm install redux --save
	npm install react-redux --save
	npm install redux-thunk --save
	echo ""
	echo "--> installing sass..."
	echo ""
	npm install node-sass --save
	echo ""
	echo "--> installing babel & weback..."
	echo ""
	npm install babel-core --save-dev
	npm install babel-loader@7 --save-dev
	npm install babel-preset-react babel-preset-es2015 --save-dev
	touch .babelrc
	echo "{\"presets\" : [\"react\",\"es2015\"]}" >> .babelrc
	echo ""
	npm install webpack webpack-cli webpack-merge webpack-dev-server --save-dev
	npm install babel-loader sass-loader css-loader style-loader --save-dev
  npm install clean-webpack-plugin mini-css-extract-plugin copy-webpack-plugin --save-dev
else
	echo "--> No..."

fi
echo""
echo '--> Create app tree...'

mkdir app
mkdir app/controllers
mkdir app/models
mkdir app/views
mkdir app/ressources
mkdir app/ressources/js
mkdir app/ressources/js/reducers
mkdir app/ressources/js/actions
mkdir app/ressources/js/components
mkdir app/ressources/js/containers
mkdir app/ressources/css
mkdir app/ressources/assets
mkdir app/ressources/scss
touch app/ressources/js/index.js
touch app/.env
cat <<EOM >app/ressources/js/index.js
// react stuff
import React from 'react'
import ReactDom from 'react-dom'

//redux stuff
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import allReducers from './reducers/index.js'
//my app stuf
const store = applyMiddleware(thunk)(createStore)(allReducers) // create store async

ReactDom.render(
	<Provider store = {store} >
		<div>Hello world from react</div>
	</Provider>,
	document.getElementById('app')
)


EOM
touch app/ressources/js/reducers/index.js
cat <<EOM >app/ressources/js/reducers/index.js
// need redux stuff
import {combineReducers} from 'redux'
const allReducers = combineReducers({
})
export default allReducers
EOM

touch app/server.js
cat <<EOM >app/server.js
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express')
const ejs = require('ejs')

const app = express(), DIST_DIR = path.resolve(__dirname)

app.use(express.static(DIST_DIR))
app.set('view engine', 'ejs')
app.set('views', DIST_DIR+'/views')

app.get('/', (req, res) => {
    res.render("index.ejs",{env:process.env.TYPE})
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(\`App listening to \${PORT}....\`)
    console.log('Press Ctrl+C to quit.')
})
EOM
touch app/views/index.ejs
cat <<EOM >app/views/index.ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My app</title>
    <%if (env === "prod") { %>
    <link rel="stylesheet" href="./css/main.css">
    <% } %>
</head>
<body>
    <main class="main" id="app"></main>
    <script src="./js/main.js"></script>
</body>
</html>

EOM
cat <<EOM >app/.env
TYPE="dev"
PORT="8000"
EOM
touch app/ressources/scss/main.scss
tree app
