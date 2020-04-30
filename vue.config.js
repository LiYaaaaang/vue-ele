module.exports = {
    publicPath: '/wxzf/dist/', // 打包文件相对路径
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        //在axios里面配置了根路径，所以这边可以不用了，因为heroku的服务器本来就是允许跨域访问的
        proxy: {
            // 配置跨域
            '/api': {
                target: 'https://ele-interface.herokuapp.com/api/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    }
}