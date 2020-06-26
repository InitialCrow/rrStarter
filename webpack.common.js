const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin')

var config = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(svg|ttf|woff2|woff|eot)$/,
                loader:'file-loader',
                exclude: [/images/],
                options:{
                    name: 'assets/fonts/[name].[ext]',
                }
            },
            {
                test: /\.(svg|gif|png|jpg)$/,
                loader:'file-loader',
                exclude: [/fonts/],
                options:{
                    name: 'assets/images/[name].[ext]',
                }
            }

        ]
    },
    performance: {
        hints: "warning", // enum
        maxAssetSize: 200000000, // int (in bytes),
        maxEntrypointSize: 400000000, // int (in bytes)
        assetFilter: function(assetFilename) {
        // Function predicate that provides asset filenames
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    plugins:[
        new CopyWebpackPlugin({
            // {output}/to/file.txt
            patterns:[
                { from: 'assets/**/*', to: __dirname+'/dist', context: './ressources/', noErrorOnMissing:true},
                { from: 'manifest.json', to: __dirname+'/dist', context: './ressources/', noErrorOnMissing:true },
                { from: './controllers/**/*', to: __dirname+'/dist', noErrorOnMissing:true},
                { from: './models/**/*', to: __dirname+'/dist', noErrorOnMissing:true},
                { from: './views/**/*', to: __dirname+'/dist', noErrorOnMissing:true},
                { from: './routes/**/*', to: __dirname+'/dist', noErrorOnMissing:true},
                { from: './server.js', to: __dirname+'/dist', noErrorOnMissing:true},
            ],
            options:{

            }
        }),
    ]
}

var mainConfig = Object.assign({}, config, {
    context: path.resolve(__dirname, 'app'),
    name: "main",
    entry:  {main:['./ressources/js/index.js', './ressources/scss/main.scss']},
    output: {
       path: path.resolve(__dirname, 'dist'),
       filename: "js/main.js"
    },
});



module.exports = [mainConfig]