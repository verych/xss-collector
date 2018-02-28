'use strict';

const PRODUCTION = process.argv.indexOf('-p') !== -1;
const NODE_ENV = PRODUCTION ? 'production' : 'development';

const webpack = require('webpack'),
    path = require('path');

    
const config = [
    {
        watch: false,
        entry: path.join(__dirname, "/src/index.js"),
        output: {
            path: path.join(__dirname, 'public'),
            filename: "x.min.js",
            library: "x",
            libraryTarget: "var"
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
            })
        ],
        devtool: PRODUCTION ? false : "cheap-inline-module-source-map",
        mode: PRODUCTION? 'production': 'development'
    }
];

if (PRODUCTION) {
    config.forEach(function (element) {
        element.optimization = {
            minimize: true
        }
    }, this);
}

module.exports = config;


