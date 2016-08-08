require('./index.css')

let addScopeHtml = require('../tools/add-scope-html/index.js')

let html = require('./index.html')

var newHtml = addScopeHtml(html, 'xusheng')

document.body.innerHTML = newHtml