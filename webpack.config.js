const webpack = require('webpack');
const path = require('path');

const BUILD_PATH = path.join(__dirname, 'app');
const OUT_PATH = path.join(__dirname, 'dist')

var isProduction = function () {
    return process.env.NODE_ENV === 'production';
};

var plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    //提供入口,每个文件自动require以下依赖
    new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
        reqwest: 'reqwest'
    })
]

if (isProduction()) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
    )
}

module.exports = {
    devtool: 'source-map',
    //出入项
    plugins: plugins,
    //页面入口文件配置
    entry: {
        app: path.join(__dirname, 'app'),
        vendors: ['react']
    },
    //入口文件输出配置
    output: {
        path: path.join(__dirname, 'dist' + (isProduction() ? "_production" : "")),
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
