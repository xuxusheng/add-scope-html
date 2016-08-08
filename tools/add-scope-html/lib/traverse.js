var parse5 = require('parse5')
var TreeAdapter = parse5.treeAdapters.htmlparser2

module.exports = traverse

function traverse(node, scope) {
    
    // 调用添加自定义属性的函数
    addAttr(node, scope)
    
    // 如果此节点存在子节点，则再次遍历其子节点
    if(typeof node.children !== 'undefined') {
        node.children.forEach(function(item) {
            traverse(item, scope)
        })
    }
}

// 如果节点类型为 标签，则添加上自定义属性
function addAttr(node, scope) {
    if(node.type === 'tag') {
        TreeAdapter.adoptAttributes(node, [{name: scope, value: ''}])
    }
}