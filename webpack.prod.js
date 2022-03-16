import {merge} from "webpack-merge"
import common from "./webpack.common.js"
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const { loader } = MiniCssExtractPlugin;

import WorkboxWebpackPlugin from "workbox-webpack-plugin"

var prodConf = {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                loader,
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


export default [ 
    merge(common[0], prodConf),
   
]