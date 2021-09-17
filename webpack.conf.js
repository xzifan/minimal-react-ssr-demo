const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack")

module.exports = {
    entry: 'src/index.js',
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src'),
            assets: path.resolve(__dirname, 'src/assets')
        }
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use:[ MiniCssExtractPlugin.loader, "css-loader" ]
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },{
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({}),
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: '[name].style.css' 
        }),
        new webpack.ProgressPlugin({
            activeModules: false,
            entries: true,
            handler(percentage, message, ...args) {
                console.info((percentage*100).toFixed(2)+'%', message, ...args);
            },
            modules: true,
            modulesCount: 5000,
            profile: false,
            dependencies: true,
            dependenciesCount: 10000,
            percentBy: null,
          })
    ],
    devServer: {
        port: '8080',
        hot: true,
        compress: false,
    },
}