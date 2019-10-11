const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',
    entry: {
        bundle:path.join(__dirname, './src/index.js'),
    },
    output: {
        path: path.join(__dirname, './build'),
        filename: '[name].js'
    },
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: '8000',
        overlay: true
    },
    module: {
        rules: [{
            test: /\.(css|scss)$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader //将css文件单独打包出来
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        sourceMap: true,
                        plugins: [
                            require('autoprefixer')({
                                Browserslist: ['last 5 versions']
                            }),
                        ]
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        },
            {
                test: /\.(js|jsx)$/,
                exclude: path.join(__dirname, 'node_modules'),
                use: ['babel-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',//指定生成的图片名称 ext后缀名
                        },
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './public/index.html'),
            minify: { //对当前生成的文件进行压缩
                removeComments: true, //删除注释
                collapseWhitespace: true //删除空格
            }
        }),
        new MiniCssExtractPlugin({ //单独打包css
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ]
};