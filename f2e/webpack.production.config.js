/**
 * Created by john on 15/9/28.
 */
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var deps = [
    'react/dist/react.min.js'
];

var config = {
    entry: {
        app:path.resolve(__dirname, "./src/js/app.js"),
        mobile:path.resolve(__dirname, "./src/js/mobile.js"),
        test:[path.resolve(__dirname, "./src/js/test.js")],
        mock:[path.resolve(__dirname, "./src/js/mock.js")],
        vendors: ['react']
    },
    resolve: {
        alias: {}
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude:[node_modules_dir],
                loaders: ['babel-loader'],
            },
            { test: /\.css$/, loader: "style!css" },
            // LESS
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.(png|jpg)$/, loader: 'url?limit=25000'}
        ],
        noParse: []
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
};

deps.forEach(function (dep) {
    var depPath = path.resolve(node_modules_dir, dep);
    config.resolve.alias[dep.split(path.sep)[0]] = depPath;
    config.module.noParse.push(depPath);
});

module.exports = config;