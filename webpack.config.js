import path from "path"
import TerserPlugin from "terser-webpack-plugin"

export default {
    entry: {
        content: "./src/content/index.js",
        background: "./src/background/index.js",
    },
    output: {
        path: path.resolve("./extension"),
        filename: "[name].js",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {ascii_only: true},
                },
            }),
        ],
    },
    resolve: {
        extensions: [".js"],
    },
}
