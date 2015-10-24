/**
 * Created by john on 15/9/28.
 */
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
    entry: {
        app:['webpack/hot/dev-server',path.resolve(__dirname, "./src/js/app.js")],
        mobile:['webpack/hot/dev-server',path.resolve(__dirname, "./src/js/mobile.js")],
        vendors: ['react']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude:[node_modules_dir],
                loaders: ['react-hot','babel-loader'],
            },
            { test: /\.css$/, loader: "style!css" },
            // LESS
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.(png|jpg)$/, loader: 'url?limit=25000'}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
};

module.exports = config;