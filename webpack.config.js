const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: "appliconcept-react",
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.(sc|c)ss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ]},
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff&name=./fonts/[hash].[ext]" },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?&name=./fonts/[hash].[ext]"
            }
        ]
    },
    externals: {
        "react": "React",
        "lodash": "lodash"
    },
    plugins: [
        new UglifyJsPlugin()
    ]
};