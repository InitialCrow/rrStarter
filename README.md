rrStarter v3.2
===================


Hi you can use this litle script for init bootstrap your redux-react project watchout, this is not a framework but a 'classic base of redux project' with this script you can choose to init your project from scratch or if you use ES6+ with babel, react, redux, express with nodejs, you will init all your project and install dependencies you have a webpack-config with this.

----------

## node version
- rrstarter work with latest node version you can run with old version but you should fix dependencies issues after rrstarter is currently maintened to use always last dependencies to get always best building performance.

- if you use old version of node just try to restore old dependencies version in package.json 

-------------

HOW TO USE
-------------

Just run `sh install.sh`in your teminal after script ask you if you want to choose install with framework or from scratch

- After dependencies was installed add this lines to **package.json** object (you can add other script if you need)
	
	`	
		"type": "module",
		"scripts": {
			"start": "npm-run-all --parallel watch:server watch:build",
			"watch:build": "webpack --config ./webpack.dev.js --watch",
			"watch:server": "nodemon \"./dist/server.js\" ",
			"build:dev": "webpack --config ./webpack.dev.js",
			"build:prod": "webpack --config ./webpack.prod.js",
			"clear:dist": "rm -r ./dist",
			"clear": "rm -rf ./dist rm -rf ./node_modules"
		}
	`


now you are ready to dev with nodejs react and redux fast no ?

- Just run `npm run start` this will create a **dist** folder with webpack and nodemon watching

or

- you can run `npm run build:prod` to create production build in **dist** after you just need to upload dist folder on production service you can set your env variable in **.env** file


## v3.2 features


V3.2 fix some minor installation bugs
V3.2 add more tool to express configuration default
V3.2 rewrite files to "module" files for nodes, rrstarter use now es6 import syntax think to create .mjs for server files


note : rrStarter work always with with last version of webpack, react, redux, express

## License

this project is on MIT license mention and follow is apreciate