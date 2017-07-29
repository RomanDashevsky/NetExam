const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const srcPath = path.resolve(__dirname, 'src');

module.exports = {
    context: srcPath,

    entry: 'index.js',

    output: {
        filename: 'js/index.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'public')
    },

    resolve: {
        modules: [
            'node_modules',
            srcPath
        ],

        extensions: ['.js']
    },

    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                options: {
                    inlineRequires: 'images\/'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader?sourceMap'
                })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader!sass-loader',
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(woff2?|svg)$/,
                loader: 'url-loader',
                include: path.resolve(__dirname, 'node_modules', 'bootstrap-sass', 'assets'),
                options: {
                    limit: '120000'
                }
            },
            {
                test: /\.(ttf|eot)$/,
                loader: 'file-loader',
                include: path.resolve(__dirname, 'node_modules', 'bootstrap-sass', 'assets'),
                options: {
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(png|gif|jpg|svg|ttf|eot|woff|woff2)$/,
                include: path.resolve(__dirname, 'src', 'images'),
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    limit: 8192
                }
            }
        ]
    },

    devtool: 'source-map',

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        historyApiFallback: true,
        port: 9000,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8888'
            }
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.hbs'
        }),
        new ExtractTextPlugin('css/index.css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'windows.jQuery': 'jquery',
            _: 'underscore',
            Backbone: 'backbone',
            Bb: 'backbone',
            Mn:'backbone.marionette',
            Radio: 'backbone.radio',
            Validation: 'backbone-validation'
        })
    ]
};
