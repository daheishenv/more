/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2021-07-29 20:18:05
 */
import {
    Message
} from 'element-ui'
export default function ({ $axios, redirect, app }) {
    // request interceptor
    if (process.env.NODE_ENV === 'production') {
        $axios.defaults.baseURL = process.env.baseUrl
    }
    $axios.interceptors.request.use(
        (config) => {
            // do something before request is sent
            const { headers: { common } } = config
            common['shop-uid'] = 20
            common['platform-type'] = 'b'
            common['app-type'] = 3
            const token = app.$cookies.get('applet_token', {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            })
            if (token) {
                common.Authorization = `bearer ${token}`
            }
            return config
        },
        (error) => {
            // do something with request error
            return Promise.reject(error)
        }
    )
    $axios.onRequest((config) => {
        console.log('Making request to ' + config.url)
    })
    // response interceptor
    $axios.interceptors.response.use(
        /**
         * Determine the request status by custom code
         * Here is just an example
         * You can also judge the status by HTTP Status Code
         */
        (response) => {
            const { data: { code, msg } } = response
            if (code === 20200) {
                redirect('/login')
            } else if (code === 20000) {
                Message({
                    message: msg,
                    type: 'error'
                })
            }
            return Promise.resolve(response)
        },
        (error) => {
            console.log('err' + error, '错误啦') // for debug
            return Promise.reject(error)
        }
    )

    $axios.onError((error) => {
        // return Promise.reject(error)
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/404')
        } else if (code === 500) {
            redirect('/500')
        }
    })
}
