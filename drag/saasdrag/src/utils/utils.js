let humpToLine = (str) => {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}
/**
 * 样式数据转字符串
 * @param obj
 * @param builtInStyyle
 * @returns {string}
 */
let iStyleToString = (obj, builtInStyyle = "") => {
    let str = ' style="'
    let styleContent = ""
    for (let key in obj) {
        if (obj[key] !== '') {
            styleContent += (humpToLine(key) + ':' + obj[key] + ';')
        }
    }
    if (styleContent === "" && builtInStyyle === "") {
        return ""
    }
    str += builtInStyyle
    str += styleContent
    str += '"'
    return str
}

/**
 * 存放样式类的数据转字符串
 * @param arr
 * @param builtInClass 默认手动添加的类名
 * @returns {string}
 */
let iClassToString = (arr, ...builtInClass) => {

    if ((arr && arr.length === 0) && builtInClass.length === 0) {
        return ""
    }

    let buildtInClassStr = builtInClass.join(' ')
    let str = ` class="${buildtInClassStr}`
    for (let iClass in arr) {
        str += (' ' + arr[iClass])
    }
    str += `"`

    if (str === ' class=""') {
        return ''
    }
    return str
}

let getArrClassToMap = (arr, map) => {
    for (let arrItem in arr) {
        map[arrItem] = ""
    }
    return map
}

let _outlinebreak = (num) => {
    let s = '\n'
    for (let i = 0; i < num; i++) {
        s += '  '
    }
    return s
}

/**
 * 格式化html部分字符串
 * @param html
 */
let formatStrByHtml = (html) => {
    let startStr = '<template>'
    let endStr = '</template>'
    let startIndex = html.indexOf(startStr) + startStr.length
    let endIndex = html.indexOf(endStr)
    let resultStr = startStr
    let cacheStr = ''
    let stack = []
    let lineBreakNum = 1
    let flag = false, flag2 = false
    for (let i = startIndex; i <= endIndex; i++) {
        let iChar = html.charAt(i)
        if (iChar === '\n' && cacheStr === '') {
            continue
        } else if (iChar === '\n') {
            cacheStr += ' '
            continue
        }
        if (iChar === '<' && cacheStr !== '') {
            resultStr += cacheStr
            cacheStr = ''
            flag = true
        }

        cacheStr += iChar

        if (iChar === '>') {

            if (stack.length === 0) {
                stack.push(cacheStr)
            } else {
                let regx = /^<(((?!\/).)+?)[ |>]/
                let regxEnd = /^<\/(.+?)>$/
                let stackStr = stack[stack.length - 1]
                stackStr = stackStr.match(regx)
                let cacheStrRegx = cacheStr.match(regxEnd)
                if (stackStr && cacheStrRegx && stackStr[1] === cacheStrRegx[1]) {
                    stack.pop()
                    flag2 = true
                } else {
                    stack.push(cacheStr)
                    lineBreakNum++
                    flag2 = false
                }
            }

            if (!flag) {
                resultStr += _outlinebreak(lineBreakNum)
            } else {
                flag = false
            }

            if (html.charAt(i - 1) === '/') {
                stack.pop()
                lineBreakNum--
            }

            if (flag2) {
                lineBreakNum--
            }

            resultStr += cacheStr
            cacheStr = ''
        }
    }
    resultStr += '\n'
    resultStr += endStr
    resultStr += (html.substring(endIndex + endStr.length))
    return resultStr
}

// 二开
/**
 * 获取项目的首页数据
 * @param {Object} project 选中的项目 
 * @return {Object} 项目的首页数据
 */
function indexData(project) {
    if (project) {
        //查找page
        let pagesFolder = project.listData.filter(val => {
            return val.label === 'pages'
        })
        //查找index
        let indexFolder = pagesFolder && pagesFolder[0].children.filter(val => {
            return val.label === 'index'
        })
        //查找index.vue
        let data = indexFolder && indexFolder[0].children.filter(val => {
            return val.label === 'index.vue'
        })
        return data[0] || {};
    }
    return {}
}
/**
 * 拖拽对象是否允许拖拽
 * 停靠对象是否允许停靠
 * @param {*} node
 * @return cmptId
 */
function getDragNode(node) {
    const newNode = Array.from(node.childNodes).find(item => item.nodeName !== '#comment' && item.getAttribute("data-cmpt-id"))
    return newNode
}

// 二开
// 内嵌后台, 获取iframe地址签名参数
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

export { humpToLine, iStyleToString, iClassToString, getArrClassToMap, formatStrByHtml, indexData, getDragNode, getQueryVariable }
