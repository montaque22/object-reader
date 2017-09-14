const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: './src/js/object-reader.js',
    output: {
        libraryTarget: "umd",
        filename: 'object-reader.min.js',
        path: path.resolve(__dirname,'dist')
    },
    plugins:[new UglifyJSPlugin()]
};
