const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const WorkboxWebpackPlugin = require ("workbox-webpack-plugin")

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
            /admin.js/,
          ],

          maximumFileSizeToCacheInBytes: 5000000000,
        })
    ]
}
module.exports = [ 
    merge(common[0], swConf)
]