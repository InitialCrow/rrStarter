rrStarter v2.0
===================


Hi you can use this litle script for init your redux-react project watchout, this is not a framework but a 'classic base of redux project' with this script you can choose to init your project from scratch or if you use ES6 with babel, react, redux, express with nodejs, you will init all your project and install dependencies you have a webpack-config with this.

----------


HOW TO USE
-------------

Just run `sh install.sh`in your teminal after script ask you if you want to choose install with framework or from scratch

- After dependencies was installed you just run `gulp webpack` and this will create a **dist** folder with webpack watching 

or

- you can run `gulp build` to write production build in **dist** folder or if you dev full app 

or

- you can run `gulp serve` if you want serve server it will launch nodemon on dist/server.js with webpack watch its realy powerfull cause you have automatic dev build an restart server when you need in dist


## v2.0 features


v2.0 add some function like `gulp build ` to do production build an `gulp webpack` to listen webpack watch on change 

Compilation of file with `gulp serve ` was optimised now you just compile when is needed, so you have to wait **~0.5ms after initial build instead 4000 ms !!!** 

After you have the power to modify **the webpack** enfoy this kiss :)

note : rrStarter work now with webpack 3.0

## License

this project is on MIT license mention and follow is apreciate 
