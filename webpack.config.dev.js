const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/dev.js',
        scss: './src/styles/dev.scss'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dev')
    },
    devServer: {
        contentBase: path.join(__dirname, "dev"),
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
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/dev.html'
    })]
};