'use strict'
let path = require('path')
let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let attrLoader = require('./tools/attr-loader')
let precss = require('precss')
let htmlLoader = require('./tools/html-loader/loader')

const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const BUILD_PATH = path.resolve(ROOT_PATH, 'build')

module.exports = (() => {
    let config = {}

    config.resolve = {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.ts', '.js']
    }

    config.entry = {
        src: SRC_PATH
    }

    config.output = {
        filename: 'bundle.js',
        path: BUILD_PATH
    }

    config.module = {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules!css-attr-scope-loader?scope=xusheng')
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css?modules!css-attr-scope-loader?scope=xusheng!postcss?parser=postcss-scss')
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            },
            exclude: /node_modules/
        }, {
            test: /\.html$/,
            loader: htmlLoader()
        }]
    }

    config.postcss = [
        precss({
            import: {
                extension: 'scss'
            }
        })
    ];

    config.plugins = [
        new ExtractTextPlugin("style.css"),

        new HtmlWebpackPlugin({
            title: 'xusheng'
        })
    ]

    config.devtool = 'eval-source-map'

    config.devServer = {
        historyApiFallBack: true,
        hot: true,
        inline: true,
        progress: true
    }

    return config
})()