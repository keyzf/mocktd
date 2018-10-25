const path = require('path');
module.exports = {
    mode: "development",
    entry: ['./src/app.js'],
    output: {
        path: path.join(__dirname, '../dist'),
        filename: "[name].js",
    },
    resolve: {
        // modules: [
        //     "node_modules",
        //     "src"
        // ]
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                "test": /\.js$/,
                loader: "babel-loader",
                options: {
                    "cacheDirectory": true,
                    "babelrc": false,
                    "presets": [
                        [
                            "env",
                            {
                                "targets": {
                                    "node": "8.11.1"
                                },
                                "modules": false,
                                "useBuiltIns": false,
                                "debug": false
                            }
                        ],
                        "@babel/preset-flow"
                    ],
                    "plugins": []
                }
            },
        ]
    },
    bail: false,
    cache: true,
    stats: {
        "cached": false,
        "cachedAssets": false,
        "chunks": false,
        "chunkModules": false,
        "colors": true,
        "hash": false,
        "modules": false,
        "reasons": true,
        "timings": true,
        "version": false
    },
    devtool: "cheap-module-inline-source-map",
    name: "server",
    target: "node",
    node: {
        "console": false,
        "global": false,
        "process": false,
        "Buffer": false,
        "__filename": false,
        "__dirname": false
    }
}