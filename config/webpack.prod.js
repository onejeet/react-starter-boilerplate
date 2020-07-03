const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

const enableBundleAnalyzer = process.env.ENABLE_ANALYZER === "true";

module.exports = (env) =>
    merge(common, {
        mode: "production",
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: "css-loader" },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
                                config: {
                                    path: path.resolve(__dirname, "../config/"),
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.s(a|c)ss$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: "css-loader" },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
                                config: {
                                    path: path.resolve(__dirname, "../config"),
                                },
                            },
                        },
                        { loader: "sass-loader" },
                    ],
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: "all",
            },
            runtimeChunk: false,
        },
        plugins: [
            new CleanWebpackPlugin({
                root: process.cwd(),
                verbose: true,
                dry: false,
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: [
                        "default",
                        { discardComments: { removeAll: true } },
                    ],
                    canPrint: false,
                },
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[hash:8].css",
                chunkFilename: "[id].[hash:8].css",
            }),
            new ManifestPlugin(),
            new BundleAnalyzerPlugin({
                analyzerMode:
                    enableBundleAnalyzer === true ? "static" : "disabled",
                openAnalyzer: true,
            }),
            new webpack.DefinePlugin({
                "process.env.REACT_APP_ENV": JSON.stringify(
                    `${env.REACT_APP_ENV}`
                ),
                "process.env.MAP_STYLE": JSON.stringify(`${env.MAP_STYLE}`),
            }),
        ],
    });
