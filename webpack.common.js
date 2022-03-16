import { resolve, dirname } from "path";
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var config = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                options: {
                    presets: ["@babel/preset-env","@babel/preset-react"]
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
                { from: './assets/**/*', to: __dirname+'/dist', context: './ressources/', force:true, noErrorOnMissing: true, },
                { from: 'manifest.json', to: __dirname+'/dist', context: './ressources/', force:true, noErrorOnMissing: true,  },
                { from: './controllers/**/*', to: __dirname+'/dist', force:true, noErrorOnMissing: true, },
                { from: './models/**/*', to: __dirname+'/dist', force:true, noErrorOnMissing: true, },
                { from: './views/**/*', to: __dirname+'/dist', force:true, noErrorOnMissing: true, },
                { from: './routes/**/*', to: __dirname+'/dist', force:true, noErrorOnMissing: true, },
                { from: './server.js', to: __dirname+'/dist', force:true, noErrorOnMissing: true, },
            ],
            options:{
                // By default, we only copy modified files during
                // a watch or webpack-dev-server build. Setting this
                // to `true` copies all files.
                concurrency: 100
            }
        }),
    ]
}

var mainConfig = Object.assign({}, config, {
    context: resolve(__dirname, 'app'),
    name: "main",
    entry:  {main:['./ressources/js/index.js', './ressources/scss/main.scss']},
    output: {
       path: resolve(__dirname, 'dist'),
       filename: "js/main.js"
    },
});



export default [mainConfig]