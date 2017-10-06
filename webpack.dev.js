const path      = require('path');
const merge     = require('webpack-merge');
const common    = require('./webpack.common.js');
const HtmlWebpackPlugin     = require('html-webpack-plugin');

const {contentBase, devEntry, devOutput, index}    = require('./config.json');
module.exports = merge(common, {

    entry: {
        app: devEntry
    },

    devtool: 'inline-source-map',

    devServer: {
        contentBase
    },



    output: {
        filename: devOutput,
        path: path.resolve(__dirname, contentBase)
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'KingDOM',
            template: index
        })
    ],

    externals: {
        "jquery": "jQuery",
    },
});
