const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require ("workbox-webpack-plugin")

var prodConf = {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        }]
    },
    plugins: [
       
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new WorkboxWebpackPlugin.InjectManifest({
          swSrc: './ressources/sw.js',
          swDest: 'service-worker.js',
          exclude: [
            /controllers/,
            /models/,
            /routes/,
            /server.js/,
            /main.js/,
            /admin.js/,
          ],

          maximumFileSizeToCacheInBytes: 5000000000,
        })
    ]
}

module.exports = [ 
    merge(common[0], prodConf)
]