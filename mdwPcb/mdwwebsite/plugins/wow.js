/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2021-07-29 20:18:23
 */

import Vue from 'vue'
import '@/assets/css/animate.css'
if (process.browser) {
    const { WOW } = require('wowjs')
    Vue.prototype.$WOW = WOW
}
