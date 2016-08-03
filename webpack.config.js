const webpack = require('webpack');
const path = require('path');
const optimizePlug = new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js');

module.exports = {
    //出入项
    plugins: [optimizePlug],
    //页面入口文件配置
    entry: {
        app: path.join(__dirname, 'app'),
        vendors: ['react']
    },
    //入口文件输出配置
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    }
}
