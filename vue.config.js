const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: './',
    productionSourceMap: false,
    transpileDependencies: true,
    lintOnSave: false,
    // devServer: { //开发服务器的配置
    //     proxy: {
    //         '/lrc': {
    //             target: 'https://cdn.moefe.org/music', // 后台接口地址
    //             // ws: true,        //如果要代理 websockets，配置这个参数
    //             // secure: false, // 如果是https接口，需要配置这个参数
    //             changeOrigin: true, //是否跨域
    //             // pathRewrite:{	// 重写路径
    //             //     '^/lrc':''
    //             // }
    //             onProxyReq(proxyReq) {
    //                 proxyReq.setHeader('origin', 'https://cdn.moefe.org/music');
    //                 proxyReq.setHeader("referer", ' https://cdn.moefe.org/music');
    //             },
    //         }
    //     }
    // }
})