/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-06-16 10:49:46
 */
import Vue from 'vue'
import store from '@/store'
// 属性是否属于最外一层，这个参数特例,只要是最外层属性是对象格式才需要写在这边
const outerPro = ['apiParam']
// 获取组件配置
function getCmptInfo(module_name, componentsInfo) {
    //遍历所有组件配置并取消分组放入到同一个数组中
    const allComponentsInfo = [].concat(...Object.values(componentsInfo).map(o => o))
    // 直接遍历最外层看是否存在这个组件,不存在这个组件的话可能是风格配置选择出来的
    let curCmpt = allComponentsInfo.find(cmpt => cmpt.module_name === module_name) || {}
    return curCmpt
}

// 填充数据 --- 合并本地组件信息跟托拉拽返回的信息
function fillItemData(item) {
    const newItem = Vue.prototype.$deepClone(item)
    const { module_name } = newItem
    // 配置取本地
    let curItem = Vue.prototype.$deepClone(getCmptInfo(module_name, store.state.componentsInfo))
    // item.data = curItem.api ? (store.state.newHomeData && store.state.newHomeData[curItem.module_no] || []) : item.data

    // 防止报错
    curItem.rightConfig = curItem.rightConfig || {}

    newItem.rightConfig = newItem.rightConfig || {
        attribute: [],
        source: []
    }

    curItem.rightConfig.attribute && (newItem.rightConfig.attribute = curItem.rightConfig.attribute.reduce((a, b) => {
        b.value = getItemValue(b, item)
        a.push(b)
        return a
    }, []))

    curItem.rightConfig.source && (newItem.rightConfig.source = curItem.rightConfig.source.reduce((a, b) => {
        b.value = getItemValue(b, item)
        a.push(b)
        return a
    }, []))
    return Object.assign({}, curItem, item)
}
// 匹配配置与现有的值进行合并
function getItemValue(defaultItem, item) {
    const { extra = {} } = item
    let value
    if (outerPro.includes(defaultItem.pro)) {
        value = item[defaultItem.pro] ? item[defaultItem.pro][defaultItem.key] : defaultItem.value
    } else if (defaultItem.pro) {
        value = defaultItem.key ? (extra[defaultItem.pro] ? extra[defaultItem.pro][defaultItem.key] : defaultItem.value) : extra[defaultItem.pro]
    } else if (defaultItem.key) {
        value = item[defaultItem.key]
    }
    // 要确保value有值
    value = value === undefined ? defaultItem.value : value
    // console.log(value)
    const valueType = Vue.prototype.$typeOf(defaultItem.value)
    const valArr = valueType === 'Number' ? String(value).split(' ') : value
    value = valueType === 'Number' ? parseInt(valArr[valArr.length - 1]) : value
    if (defaultItem.multip) {
        value /= defaultItem.multip
    }
    return value
}

function getSimpleValue(defaultItem, item) {
    const { extra = {} } = item
    let value
    if (outerPro.includes(defaultItem.pro)) {
        value = item[defaultItem.pro] ? item[defaultItem.pro][defaultItem.key] : defaultItem.value
    } else if (defaultItem.pro) {
        value = defaultItem.key ? (extra[defaultItem.pro] ? extra[defaultItem.pro][defaultItem.key] : defaultItem.value) : extra[defaultItem.pro]
    } else if (defaultItem.key) {
        value = item[defaultItem.key]
    }
    return value
}

// 把右侧修改内容格式化成提交的格式
function formatItemData(item) {
    if (!item) return {}
    item = Vue.prototype.$deepClone(item)
    let extra = {}
    const attribute = item.rightConfig && item.rightConfig.attribute || []
    const source = item.rightConfig && item.rightConfig.source || []
    let data = attribute.concat(source)

    // 这边要过滤隐藏掉的元素
    data = data.filter(o => {
        if (!o.show) return true
        if (String(o.show) === 'false') return true
        // 如果所有项都不能点击则隐藏该选项
        const options = getOptions(o, item)
        if (options.length > 0 && options.length === options.filter(o => o.disabled).length) return false
        return o.show.contains.includes(getShowValue(o.show, item))
    })

    if (data.length) {
        data.forEach(o => {
            let value = o.multip ? o.value * o.multip : o.value
            if (o.key === 'margin') {
                value = `0 ${value}${o.unit}`
            } else if (o.key === 'padding') {
                value = `0 ${value}${o.unit}`
            } else if (o.unit) {
                value += o.unit
            }
            if (outerPro.includes(o.pro)) {
                !item[o.pro] && o.key && (item[o.pro] = {})
                item[o.pro][o.key] = value
                o.key ? (item[o.pro][o.key] = value) : (item[o.pro] = value)
            } else if (o.pro) {
                !extra[o.pro] && o.key && (extra[o.pro] = {})
                o.key ? (extra[o.pro][o.key] = value) : (extra[o.pro] = value)
            } else if (o.key) {
                item[o.key] = value
            }
        })
    }
    item.extra = transformExtra(extra)
    return item
}

function getOptions(curObj, item) {
    const { options, type } = curObj
    if (!['checkbox', 'switch'].includes(type)) return []
    const newOptions = options && options.length ? options : [
        { label: '否', value: 0 },
        { label: '是', value: 1 }
    ]
    return newOptions.map(o => {
        if (o.disabledRule && o.disabledRule.length) {
            for (let rule of o.disabledRule) {
                if (rule.contains && rule.contains.length && rule.contains.includes(getShowValue(rule, item))) {
                    o.disabled = true
                } else {
                    o.disabled = false
                }
            }
        }
        return o
    })
}

function getShowValue(showItem, item) {
    const attribute = item.rightConfig && item.rightConfig.attribute || []
    const source = item.rightConfig && item.rightConfig.source || []
    // 这边要过滤隐藏掉的元素
    const data = attribute.concat(source)
    return (data.find(o => o.pro === showItem.pro && o.key === showItem.key) || {}).value
}

// 转换配置
function transformExtra(extra) {
    const { titleLayer = {}, outerLayer = {}, innerLayer = {} } = extra
    // 把背景颜色赋值给内容颜色(标题无背景 + 组件边距) = 标题边距为0 + 内容背景 + 组件无背景
    const margin = getNumberValue(outerLayer.margin)
    if (outerLayer.bgColor || outerLayer.isBGC === 0) {
        if (titleLayer.hasBg === 0) {
            innerLayer.backgroundColor = outerLayer.bgColor
            innerLayer.backgroundImage = outerLayer.backgroundImage
            innerLayer.borderRadius = outerLayer.borderRadius
            outerLayer.backgroundColor = null
            outerLayer.backgroundImage = null
            titleLayer.padding = margin > 0 ? '0' : '0 24rpx'
        } else if (titleLayer.hasBg === 1) {
            innerLayer.backgroundColor = null
            innerLayer.backgroundImage = null
            innerLayer.borderRadius = null
            outerLayer.backgroundColor = outerLayer.bgColor
            outerLayer.backgroundImage = outerLayer.backgroundImage
            titleLayer.padding = margin > 0 ? `0 ${margin}rpx` : '0 24rpx'
        } else {
            outerLayer.backgroundColor = outerLayer.bgColor || outerLayer.backgroundColor
            innerLayer.backgroundColor = innerLayer.bgColor || innerLayer.backgroundColor
        }
    }
    return {
        ...extra,
        innerLayer,
        outerLayer,
        titleLayer
    }
}

function getNumberValue(margin) {
    const marginArr = String(margin).split(' ')
    return parseInt(marginArr.pop())
}

export { getCmptInfo, fillItemData, formatItemData, outerPro, getItemValue, getSimpleValue }