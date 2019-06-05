const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    // mode: "development",
    entry: {
        'static/index': './static/index.js',
        'static/print': './static/print.js'
    },
    // devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            title: "index",
            chunks: ['static/index'],
            filename: "page/index.jsp",//这个filename 跟devserver是没有关系的
            template: path.resolve(__dirname, "./page/index.jsp"),
            // minify: true,
            // inject: false
        }),
        new HtmlWebpackPlugin({
            title: "print",
            chunks: ['static/print'],
            filename: "page/index2.html",
            template: path.resolve(__dirname, "./page/index.jsp")
        }),
        // new WorkboxPlugin.GenerateSW({
        //     clientsClaim: true,
        //     skipWaiting: true
        // })
    ],
    devServer: {
        hot:true,
        port: 3000,
        // contentBase: 'page/'
        contentBase: './dist/page'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};
