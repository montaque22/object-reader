const path = require('path');
const ClosureCompilerPlugin = require('webpack-closure-compiler');
const plugins               = [];
const isProduction          = process.env.PRODUCTION
const uglify                = new ClosureCompilerPlugin();
const devBuildOption        = isProduction ? '' : 'source-map';
plugins.push(uglify);

module.exports = {
    entry: './src/js/object-reader.js',
    output: {
        libraryTarget: "umd",
        filename: isProduction ? 'object-reader.min.js' : 'object-reader.js',
        path: path.resolve(__dirname,'dist')
    },
    devtool: devBuildOption,
    plugins: isProduction ? plugins : []
};
