"use strict";
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

module.exports = {
    entry: [
        './src/index.jsx', // your app's entry point
    ],
    /*    devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',*/
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    // ПРАВИЛА СБОРКИ
    module: {
        // правило присетов (presets)
        rules: [
            // js files
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env',
                            '@babel/react',
                        ],
                        cacheDirectory: true,
                        plugins: [
                            'react-hot-loader/babel',
                        ],
                    }
                },
            },

            // fonts

            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]'
                }
            },

            //svg

            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, // расширения
                exclude: path.resolve(__dirname, "node_modules"), // то что не будет обрабатываться
                use: [
                    {
                        loader: "url-loader", // загрузчик
                        options: {
                            limit: 10000, //байт // файл сверх этого предела, будет загружен автоматически file-lorder, при каждом рендере.
                            mimetype: "image/svg+xml",
                            name: "[path][name].[ext]"
                        }
                    }
                ]
            },

            //jpg
            {
                test: /\.jpg/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000, //байт
                            mimetype: "image/jpg",
                            name: "[path][name].[ext]"
                        }
                    }
                ]
            },

            //gif

            {
                test: /\.gif/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            mimetype: "image/gif"
                        }
                    }
                ]
            },

            //png

            {
                test: /\.png/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            mimetype: "image/png",
                            name: "[path][name].[ext]"
                        }
                    }
                ]
            },

            // sass|scss
            // Загрузчики выполняются по порядку. Снизу - вверх
            {
                test: /\.(sass|scss)$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', // creates style nodes from JS strings
                    use: [
                        {
                            loader: "css-loader", // translates CSS into CommonJS
                            options: {
                                sourceMap: true,
                                localsConvention: 'camelCase', // для имён классов импортируемых в компонентах
                                modules: {
                                    mode: "local",
                                    localIdentName: "[local]"
                                },
                            }
                        },

                        {
                            loader: "sass-loader", // compiles Sass to CSS
                            options: {
                                sourceMap: true,
                                //outputStyle: "expanded",
                            }
                        },
                       /* {
                            loader: "sass-resources-loader", //делает классы и переменные общедоступными для других файлов scss
                            options: {
                                resources: [
                                    path.resolve(__dirname, 'styles/variables.scss'),
                                    path.resolve(__dirname, 'styles/mixins.scss'),
                                ]
                            }
                        }*/
                    ],
                }),
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.join(__dirname, "src"),
            path.join(__dirname, "node_modules"), // the old 'fallback' option (needed for npm link-ed packages)
        ],
        alias: {
            "styles": path.resolve(__dirname, 'styles/'),
        }
    },

    optimization: {
        noEmitOnErrors: true
    },

    plugins: [
        // выпилил лишние языки.
        //new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ru/),
        //new webpack.ContextReplacementPlugin(/validatorjs[\/\\]src[\/\\]lang$/, /en|ru/),

        new HtmlWebpackPlugin({ // добавляет линки в шаблонный файл html
            template: './src/template.html',
            files: {
                css: ['style.css'],
                js: ["bundle.js"],
            }
        }),
    ]
};
