const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: 'index.js',

    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'js/index.js'
    },

    resolve: {
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js']
    },

    module: {
        loaders: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.scss/,
                loader: 'handlebars-loader'
            }
        ]
    },

    devtool: 'source-map',

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            _: 'underscore',
            Backbone: 'backbone',
            'windows.jQuery': 'jquery',
            Mn: 'backbone.marionette',
            Radio: 'backbone.radio',
            Validation: 'backbone-validation'
        })
    ]
};
