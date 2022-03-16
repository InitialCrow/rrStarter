import { merge } from "webpack-merge";
import common from "./webpack.common.js";
var devConf = {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {

                        url: false,
                    }
                }, {
                    loader: "sass-loader"
                },]
            },

        ]
    },
}
export default [ 
    merge(common[0], devConf),
    
]
