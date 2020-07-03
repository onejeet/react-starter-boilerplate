const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const mapStyle = process.env.MAP_STYLE === "true";

module.exports = (env) =>
    merge(common, {
        mode: "development",
        devtool: "inline-source-map",
        devServer: {
            port: 3050,
            historyApiFallback: true,
            overlay: true,
            open: true,
            stats: "errors-only",
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        { loader: "style-loader" },
                        {
                            loader: mapStyle
                                ? "css-loader?sourceMap"
                                : "css-loader",
                        },
                    ],
                },
                {
                    test: /\.s(a|c)ss$/,
                    use: [
                        { loader: "style-loader" },
                        { loader: "css-loader" },
                        { loader: "sass-loader" },
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),
            new webpack.DefinePlugin({
                "process.env.REACT_APP_ENV": JSON.stringify(
                    `${env.REACT_APP_ENV}`
                ),
                "process.env.MAP_STYLE": JSON.stringify(`${env.MAP_STYLE}`),
            }),
        ],
    });
