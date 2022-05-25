/*
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-27 11:55:53
 */
const modules = {}
const files = require.context('.', false, /\.js$/)
import { basename } from 'path'
files.keys().forEach(key => {
    if (key === './index.js') return false
    const name = basename(key, '.js')
    modules[name] = files(key).default
})
export default modules