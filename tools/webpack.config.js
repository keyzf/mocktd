const __debug = !process.argv.includes("--release");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const outExtract = new ExtractTextPlugin('out.css');
const innerExtract = new ExtractTextPlugin('inner.css');
const path = require("path");
module.exports = {
    entry: {
        main: ["./src/index.js"]
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name]-[hash:8].js",
        publicPath: '/dist',
    },
    resolve: {
        alias: {
            'gmater': '@material-ui/core'
        }
    },
    mode: __debug ? "development" : "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            babelrc: false,
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: {
                                            browsers: "> 0.25%, not dead"
                                        },
                                        debug: __debug,
                                        useBuiltIns: false
                                    }
                                ],
                                [
                                    "@babel/preset-react",
                                    {
                                        development: __debug
                                    }
                                ]
                            ],
                            plugins: [
                                [
                                    // The transform-runtime transformer plugin does three things:
                                    // Automatically requires @babel/runtime/regenerator when you use generators/async functions (toggleable with the regenerator option).
                                    // Can use core-js for helpers if necessary instead of assuming it will be polyfilled by the user (toggleable with the corejs option)
                                    // Automatically removes the inline Babel helpers and uses the module @babel/runtime/helpers instead (toggleable with the helpers option).
                                    "@babel/plugin-transform-runtime",
                                    {
                                        "corejs": false, // 指定corejs的版本
                                        "helpers": true, // 默认true，是否将内联的polyfill脚本替换
                                        "regenerator": true, //  generator的函数，是否用一个不污染全局返回的regenerator的运行时
                                        "useESModules": true,
                                    }
                                ],
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-object-rest-spread'
                            ]
                        }
                    },
                    {
                        loader: "eslint-loader",
                        options: {
                            // eslintPath
                        }
                    }
                ]
            },
            {
                test: /\.(css|sass|scss|less)$/,
                rules: [
                    {
                        exclude: path.join(__dirname, '../src'),
                        use: outExtract.extract({
                            fallback: 'style-loader',
                            use: {
                                loader: 'css-loader',
                                options: {
                                    modules: false
                                }
                            }
                        })
                    },
                    {
                        include: path.join(__dirname, '../src'),
                        use: innerExtract.extract({
                            fallback: 'style-loader',
                            use: {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    localIdentName: '[hash:base64]'
                                }
                            }
                        })
                    },
                    {
                        test: /\.less$/,
                        loader: 'less-loader'
                    },
                    {
                        test: /\.(scss|sass)$/,
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|svg|gif|tmp|jpeg)$/,
                oneOf: [
                    {
                        issuer: /\.(css|sass|scss|less)$/,
                        oneOf: [
                            {
                                test: /\.svg/,
                                loader: 'svg-url-loader',
                                options: {
                                    limit: 8199,
                                    name: '[path][name].[ext]'
                                }
                            },
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 8199,
                                    name: '[path][name].[ext]'
                                }
                            }
                        ]
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.txt$/,
                loader: 'raw-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: __debug,
        }),
        new CleanWebpackPlugin("dist", {
            root: path.join(__dirname, "../"),
            exclude: [],
            verbose: true, // 打印日志
            dry: false,
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html'),
            filename: 'index.html'
        }),
        outExtract,
        innerExtract,
    ]
}