const path              = require('path');
const merge             = require('webpack-merge');
const UglifyJSPlugin    = require('uglifyjs-webpack-plugin');
const WebpackShellPlugin= require('webpack-shell-plugin');
const common            = require('./webpack.common.js');
const { prodEntry, prodOutput, dist, prodOutputMin}     = require('./config.json');

const plugins = [];

if(process.env.PRODUCTION){
    plugins.push( new WebpackShellPlugin({
        onBuildEnd: `cp ${prodEntry} ${dist}/es6/`
    }));
    plugins.push(new UglifyJSPlugin());
}


module.exports = merge(common, {
    entry: {
        app: prodEntry
    },
    output: {
        filename: process.env.PRODUCTION ? prodOutputMin : prodOutput,
        path: path.resolve(__dirname, dist),
        libraryTarget: 'commonjs'
    },
    plugins
});
