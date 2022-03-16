import {merge} from "webpack-merge"
import common from "./webpack.common.js"


import WorkboxWebpackPlugin from "workbox-webpack-plugin"

var swConf = {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                },]
            },
            
        ]
    },
    plugins: [
        // new WorkboxWebpackPlugin.GenerateSW(
        //     {
        //         maximumFileSizeToCacheInBytes: 5000000000,
        //         exclude: [
        //             /controllers/,
        //             /models/,
        //             /routes/,
        //             /server.js/
        //         ],
        //     }
        // ),

        new WorkboxWebpackPlugin.InjectManifest({
          swSrc: './ressources/sw.js',
          swDest: 'service-worker.js',
          exclude: [
            /controllers/,
            /models/,
            /routes/,
            /server.js/,
            /main.js/,
          ],

          maximumFileSizeToCacheInBytes: 5000000000,
        })
    ]
}
export default [ 
    merge(common[0], swConf),
   
]