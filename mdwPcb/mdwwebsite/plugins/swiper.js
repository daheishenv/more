/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2021-07-29 20:18:23
 */

import Vue from 'vue'
import 'swiper/dist/css/swiper.css'
if (process.browser) {
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
    Vue.use(VueAwesomeSwiper)
}
