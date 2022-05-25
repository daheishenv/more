/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: sky
 * @Date: 2021-09-26 09:05:46
 */
let modules = {}
let files = Object
// #ifndef APP-PLUS-NVUE
files = require.context('.', false, /\.js$/)
import { basename } from 'path'
files.keys().forEach(key => {
    if (key === './index.js') return false

    const name = basename(key, '.js')
    modules[name] = files(key).default
})
// #endif
// #ifdef APP-PLUS-NVUE
// #endif
export default modules
