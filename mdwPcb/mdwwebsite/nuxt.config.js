/*
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-06-22 11:49:55
 */
const webpack = require('webpack')
export default {
    telemetry: false,
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'X团商家',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
        // 字体响应式
        // script: [{ src: '/js/flexible.js' }]
    },
    env: {
        NODE_ENV: process.env.NODE_ENV || 'dev',
        baseUrl: process.env.NODE_ENV === 'production' ? 'https://app.beta.xtuan.com' : 'https://app-x.xtuan.com'
    },
    styleResources: {
        scss: ['~assets/css/variable.scss'],
        hoistUseStatements: true
    },
    server: {
        port: 7001, // default: 3000
        host: '0.0.0.0' // default: localhost
    },
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~assets/css/reset.css',
        '~assets/css/common.scss',
        'swiper/dist/css/swiper.css',
        '~assets/css/iconfont.css',
        'element-ui/lib/theme-chalk/index.css',
        'quill/dist/quill.snow.css',
        'quill/dist/quill.bubble.css',
        'quill/dist/quill.core.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/swiper.js', ssr: false },
        { src: '@/plugins/axios.js', ssr: true },
        { src: '@/plugins/route', ssr: true },
        { src: '@/plugins/wow.js', ssr: true },
        { src: '@/plugins/ElementUI.js', ssr: true },
        { src: '@/plugins/global.js', ssr: true },
        { src: '@/plugins/gt.js', ssr: false },
        { src: '~/plugins/cropper', ssr: false },
        { src: '@/plugins/vue-quill-editor.js', ssr: false }
        // {
        //     // 这边要去删除licenseKey，具体步骤如下
        //     // 在node_modules =》 找到  vue-fullpage.js  搜索关键字Fullpage.js version 3 has changed its license to GPLv3 and it requires a `licenseKey` option. Read about it here:
        //     // 把括号前面的error改成log，下一个Xn('error', 'xxx')也改成Xn('log', 'xxx')，这个提示不会影响使用
        //     src: '~plugins/fullpage', ssr: false
        // }
    ],

    axios: {
        proxy: true, // 表示开启代理
        prefix: '/api', // 表示给请求url加个前缀 /api
        credentials: true // 表示跨域请求时是否需要使用凭证
    },
    proxy: {
        '/api': {
            target: 'https://app.beta.xtuan.com', // 目标接口域名
            changeOrigin: true, // 表示是否跨域
            pathRewrite: {
                '^/api': '' // 把 /api 替换成‘’
            }
        }
    },
    watchQuery: true,
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        '@nuxtjs/style-resources'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/content
        '@nuxtjs/axios',
        '@nuxt/content',
        '@nuxtjs/toast',
        // Simple usage
        'cookie-universal-nuxt',

        // With options
        ['cookie-universal-nuxt', { alias: 'cookiz' }]
    ],
    toast: {
        position: 'top-center',
        register: [ // Register custom toasts
            {
                name: 'my-error',
                message: 'Oops...Something went wrong',
                options: {
                    type: 'error'
                }
            }
        ]
    },

    // Content module configuration: https://go.nuxtjs.dev/config-content
    content: {},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        vendor: ['axios', 'element-ui'], // 为防止重复打包
        extractCSS: { // 提取css到单独link文件
            allChunks: true
        },
        plugins: [
            new webpack.ProvidePlugin({
                'window.Quill': 'quill/dist/quill.js',
                Quill: 'quill/dist/quill.js'
            })
        ],
        extend(config, { dev, isClient }) {
            console.log(config.plugins)
            // 为 客户端打包 进行扩展配置
            if (isClient) {
                config.node = {
                    console: true,
                    fs: 'empty',
                    net: 'empty',
                    tls: 'empty'
                }
                // config.target = 'node'
                config.module.rules.push({
                    test: /\.json$/,
                    loader: 'json-loader',
                    exclude: /(locales)/
                })
                // config.plugins.push(
                //     new webpack.ProvidePlugin({
                //         // 在这儿添加下面两行
                //         'window.Quill': 'quill/dist/quill.js',
                //         Quill: 'quill/dist/quill.js'
                //     })
                // )
            }
        },
        postcss: {
            plugins: [
                require('postcss-color-replace')({
                    newColor: ['#4185EC'],
                    ordColor: ['#409EFF']
                })
            ]
        }
        // postcss: [
        //     require('postcss-px2rem-exclude')({
        //         remUnit: 16,
        //         exclude: 'pages/about'
        //     })
        // ]
    },
    generate: {
        dir: 'dist/dist/generate' // gh_pages/ instead of dist/
        // subFolders: false // HTML files are generated according to the route path
    },
    // 所有的中间件都必须放置在middleware/目录下。文件名将作为中间件的名称（如：middleware/auth将成为中间件auth）。
    router: {
        // middleware: 'jump'
        // base: '/'
    }
}
