const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    context: path.resolve(__dirname, 'app'),
    entry:  ['./ressources/js/index.js', './ressources/scss/main.scss'],
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: [/node_modules/],
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    plugins:[
        new CopyWebpackPlugin([
            // {output}/to/file.txt
            { from: './ressources/css/**/*', to: __dirname+'/dist'},
            { from: './ressources/assets/**/*', to: __dirname+'/dist'},
            { from: './controllers/*', to: __dirname+'/dist'},
            { from: './models/*', to: __dirname+'/dist'},
            { from: './views/**/*', to: __dirname+'/dist'},
            { from: './server.js', to: __dirname+'/dist'}
        ],{


        // By default, we only copy modified files during
        // a watch or webpack-dev-server build. Setting this
        // to `true` copies all files.
        copyUnmodified: false
        }),
    ]
}