/*
 * @Descripttion: 全局组件注册
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-12-18 16:42:08
 */
import Vue from 'vue'
import bHeader from '@/global/header/header'
import shopInfo from '@/global/shop-info/shop-info'
import manageMenu from '@/global/manage-menu/manage-menu'
import GeeTest from '@/global/gee-test'
const components = [
    bHeader,
    shopInfo,
    manageMenu,
    GeeTest
]
components.forEach((comp) => {
    Vue.component(comp.name, comp)
})

function getVariableType(anything) {
    return Object.prototype.toString.call(anything).slice(8, -1)
}

// 之后请自己创建一个工具方法文件，统一管理
// 深拷贝
function deepClone(obj) {
    // 申明一个容器 用于存放科隆的数据
    let warp
    // 读取类型
    const objType = getVariableType(obj)
    // 判断读到的类型 并且以符合的存放格式存放数据
    if (objType === 'Object') {
        warp = {}
    } else if (objType === 'Array') {
        warp = []
    } else {
        return obj
    }
    //  循环数据内容
    for (const x in obj) {
        //  得到的数据内容
        const value = obj[x]
        // 判断 已经得到的内容里是否还有Object，Array
        //  因为 数据中可能出现 [1,2,[4,5,4,],47,97] 这种情况
        const valueType = getVariableType(value)
        if (valueType === 'Object' || valueType === 'Array') {
            // 当出现上述情况是 使用递归函数进行再次运行
            warp[x] = deepClone(value)
        } else {
            // 如果没有出现上诉情况 直接克隆
            warp[x] = obj[x]
        }
    }
    return warp
}
async function upload(file) {
    const f = file.raw || file.target.files[0]
    const formData = new FormData()
    formData.set('file', f)
    formData.set('name', 'file')
    const { data, msg, code, result } = await this.$axios.$post('/Tools/upload', formData)
    return { data, msg, code, result }
}
Vue.prototype.$upload = upload

Vue.prototype.$deepClone = deepClone
