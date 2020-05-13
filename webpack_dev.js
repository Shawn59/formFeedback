const webpackConfig = require("./webpack.common");
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(webpackConfig, {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        contentBase: ".",
        // do not print bundle build stats
        noInfo: false,
        // enable HMR
        hot: true,
        // embed the webpack-dev-server runtime into the bundle
        inline: true,
        // serve index.html in place of 404 responses to allow HTML5 history
        historyApiFallback: true,
        port: "8888",
        host: "localhost"
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }),
    ]
});
