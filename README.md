# add-scope-html
在html中给每个标签加上自定义属性

> npm start 启动，localhost:8080 访问页面

定义了方法 addScopeHtml()，给所有 html 标签加上自定义属性

代码在 `tools/add-scope-html` 文件夹中

```
addScopeHtml(html, scope)
# html 为传入的html字符串
# scope 为需要添加的自定义属性
```

结合 attr-loader 给 css 文件中的所有选择器加上同样的 属性选择器，以使样式生效。

打开浏览器页面可以看到相应的效果。