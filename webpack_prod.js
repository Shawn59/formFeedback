const path = require('path');
const webpackConfig = require("./webpack.common");
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(webpackConfig, {
    mode: 'production',
    devtool: 'source-map', //создаёт файлики .map, значительно уменьшает вес файлов
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[hash].js'
    },
    plugins: [
        // грохает дист, при пересборке
        new CleanWebpackPlugin(),
        new ExtractTextPlugin({
            filename: 'style.[chunkhash].css',
            allChunks: true
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            // maxSize: 1148576, - указываем макс размер для каждой чанки. Вендор дробится на чанки благодаря этому свойству
            cacheGroups: {
                vendor: {
                    chunks: 'all', // всен виды чанков
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    filename: 'vendor.[chunkhash].js',
                },
            },
        },
        minimizer: [
            // Optimize minimization
            new UglifyJsPlugin({
                cache: true,
                parallel: true, // многопроцессорная параллельная сборка, для ускорения
                sourceMap: true,
                uglifyOptions: {
                    inline: false,
                    toplevel: true,
                    warnings: true
                },
            }),

            //расскоментировать для анализа бандла
            /*  new BundleAnalyzerPlugin(
                  {
                      analyzerMode: 'static', //server - для автомат запуска
                      generateStatsFile: true,
                      reportFilename: 'stats/report.html',
                      statsOptions: {
                          normal: true
                      },
                      analyzerHost: 'localhost',
                      analyzerPort: "8880"
                  }
              ),*/
        ],
    }
});
