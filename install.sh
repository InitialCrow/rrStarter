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
	npm install express-session --save
	npm install ejs --save
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
	npm install react-router --save
	npm install react-router-dom --save
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

	npm install @babel/core --save-dev
	npm install @babel/preset-env --save-dev
	npm install @babel/preset-react --save-dev
	
	touch .babelrc
	echo "{\"presets\" : [\"@babel/preset-env\",\"@babel/preset-react\"]}" >> .babelrc
	echo ""
	npm install webpack webpack-cli webpack-merge webpack-dev-server workbox-webpack-plugin --save-dev

	npm install babel-loader sass-loader file-loader css-loader style-loader --save-dev
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
mkdir app/routes

mkdir app/ressources
mkdir app/ressources/js
mkdir app/ressources/js/reducers
mkdir app/ressources/js/actions
mkdir app/ressources/js/components
mkdir app/ressources/js/containers
mkdir app/ressources/assets
mkdir app/ressources/scss
touch app/ressources/js/index.js
touch .env

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

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.env.TZ = 'Europe/Paris' 

import { config } from 'dotenv';
config();
console.log(process.env.TYPE)

import express, { static as _static, urlencoded, json } from 'express';
import ejs from 'ejs';
import session from 'express-session';

const app = express(), DIST_DIR = resolve(__dirname)



app.use(_static(DIST_DIR))

app.set('view engine', 'ejs')
app.set('views', DIST_DIR+'/views')

app.use('/assets', _static(__dirname + '/ressources/assets/'));




app.use(urlencoded({ extended: true }))
// parse application/json
app.use(json())

app.use(session({
  secret: 'secretToken',
  resave: false,
  saveUninitialized: true
}))

//routes
import mainroute from './routes/main.mjs';


app.use(mainroute)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(\`App listenings to \${PORT}....\`)
    console.log('Press Ctrl+C to quit.')
})

EOM
touch app/routes/main.mjs
cat <<EOM >app/routes/main.mjs
import { Router } from 'express';
var router = Router();
var routes = [
	'/',
]
router.get(routes, (req, res) => {
	res.render("index.ejs", { env: process.env.TYPE })
})

export default router

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
cat <<EOM >.env
TYPE="dev"
PORT="8000"
EOM

touch app/ressources/sw.js
cat <<EOM >app/ressources/sw.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
workbox.core.skipWaiting();
workbox.core.clientsClaim();


workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
EOM
touch app/ressources/manifest.json
cat <<EOM >app/ressources/manifest.json
{
  "short_name": "my app",
  "name": "My app",
  "description": "My app description",
  "icons": [
    {
      "src": "/assets/images/logo-192x192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/assets/images/logo-512x512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "/mystarturl",
  "background_color": "#3367D6",
  "display": "standalone",
  "scope": "/",
  "theme_color": "#3367D6"
}

EOM
touch app/ressources/scss/main.scss
tree app
