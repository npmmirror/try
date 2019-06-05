const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    entry: {
        index: './src/index.js',
        // another: './src/another-module.js'
//        print: './src/print.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: "./"
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Output Management"
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common'
        // })
        new webpack.NamedModulesPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        // new webpack.HotModuleReplacementPlugin()
    ]
};
