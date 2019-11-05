rrStarter v3.0
===================


Hi you can use this litle script for init bootstrap your redux-react project watchout, this is not a framework but a 'classic base of redux project' with this script you can choose to init your project from scratch or if you use ES6 with babel, react, redux, express with nodejs, you will init all your project and install dependencies you have a webpack-config with this.

----------


HOW TO USE
-------------

Just run `sh install.sh`in your teminal after script ask you if you want to choose install with framework or from scratch

- After dependencies was installed add this lines to **package.json** in "scripts" object (you can add other script if you need)

        "start"        : "npm-run-all --parallel watch:server watch:build",
        "watch:build"  : "webpack --config ./webpack.dev.js --watch",
        "watch:server" : "nodemon \"./dist/server.js\" --watch \"./dist\"",
        "build:dev"    : "webpack --config ./webpack.dev.js",
        "build:prod"   : "webpack --config ./webpack.prod.js"


now you are ready to dev with nodejs react and redux fast no ?

- Just run `npm run start` this will create a **dist** folder with webpack and nodemon watching

or

- you can run `npm run build:prod` to create production build in **dist** after you just need to upload dist folder on production service you can sett your env variable in **.env** file


## v3.0 features

v3.0 add some optimisations first its not use gulp anymore, **v3.0** reduce build time from ~**0.1ms** to ~**0.02ms** and reduce also install time
installing is more compatible with **windows ("emulate linux shell")** and v3.0 now is ready to start with minimal configuration **reducer ready** **react ready** **express server ready**


note : rrStarter work now with last version of webpack, react, redux, express

## License

this project is on MIT license mention and follow is apreciate