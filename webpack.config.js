/* 引入操作路径模块和webpack */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    /* 输入文件 */
    entry: './src/main.js',
    output: {
        /* 输出目录，没有则新建 */
        path: path.resolve(__dirname, './dist'),
        /* 静态目录，可以直接从这里取文件 */
        publicPath: '/dist/',
        /* 文件名 */
        filename: '[name]bundle.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [

        // 自动生成html插件，如果创建多个HtmlWebpackPlugin的实例，就会生成多个页面
        new HtmlWebpackPlugin({
            // 生成html文件的名字，路径和生产环境下的不同，要与修改后的publickPath相结合，否则开启服务器后页面空白
            filename: 'demo.html',
            // 源文件，路径相对于本文件所在的位置
            template: path.resolve(__dirname, './src/index.html'),
            // 需要引入entry里面的哪几个入口，如果entry里有公共模块，记住一定要引入
            chunks: ['main'],
            // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
            inject: 'body',
            // 生成html文件的标题
            title: ''
                // hash如果为true，将添加hash到所有包含的脚本和css文件，对于解除cache很有用
                // minify用于压缩html文件，其中的removeComments:true用于移除html中的注释，collapseWhitespace:true用于删除空白符与换行符
        }),
    ]
}
