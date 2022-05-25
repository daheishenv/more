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

export { getDragNode }