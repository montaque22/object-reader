const path              = require('path');
const merge             = require('webpack-merge');
const UglifyJSPlugin    = require('uglifyjs-webpack-plugin');
const WebpackShellPlugin= require('webpack-shell-plugin');
const common            = require('./webpack.common.js');
const { prodEntry, prodOutput, dist }     = require('./config.json');


module.exports = merge(common, {
    entry: {
        app: prodEntry
    },
    output: {
        filename: prodOutput,
        path: path.resolve(__dirname, dist),
        libraryTarget: 'umd'
    },
    plugins: [
        new UglifyJSPlugin(),
        new WebpackShellPlugin({
            onBuildEnd: `cp ${prodEntry} ${dist}`
        })
    ]
});
