const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: {
        main: path.resolve(__dirname, "../src", "index.js"),
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
    },
    devServer: {
        port: 3050,
        historyApiFallback: true,
        overlay: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [{ loader: "babel-loader" }],
            },
            {
                test: /.*\.(gif|png|jp(e*)g|svg)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 21000,
                            name: "images/[name]_[hash:7].[ext]",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "../public", "index.html"),
        }),
        new webpack.DefinePlugin({
            "process.env.REACT_APP_ENV": JSON.stringify(`${env.REACT_APP_ENV}`),
            "process.env.MAP_STYLE": JSON.stringify(`${env.MAP_STYLE}`),
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx"],
    },
};
