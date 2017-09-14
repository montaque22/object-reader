const path = require('path');
module.exports = {
    entry: './src/js/object-reader.js',
    output: {
        libraryTarget: "umd",
        filename: 'object-reader.js',
        path: path.resolve(__dirname,'dist')
    }
};
