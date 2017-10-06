const path = require('path');


module.exports = {

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'awesome-typescript-loader'],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ]
    },

};


console.log(process.env.PRODUCTION);

