/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Tobias Koppers @sokra
 */

// html代码压缩模块，用法：http://www.aichengxu.com/view/25981
var htmlMinifier = require('html-minifier');

var createHash = require('./lib/createHash')
var parseHtml = require('./lib/parse')

var ExtractTextPlugin = require('extract-text-webpack-plugin')

// https://www.npmjs.com/package/loader-utils
var loaderUtils = require('loader-utils');

// object-assign 这个库只对外暴露了一个函数，它的作用就是将参数中的几个对象合并到一起，用法：http://www.codesec.net/view/204364.html
var assign = require('object-assign');

// Compiles JavaScript written using template strings to use ES5-compatible syntax. For example, this:
// https://github.com/esnext/es6-templates
var compile = require('es6-templates').compile;

var path = require('path')

var os = require('os')



module.exports = function (content) {
    // console.log(content)
    this.cacheable && this.cacheable();
    var callback = this.async();
    var query = loaderUtils.parseQuery(this.query);
    var scopeLen = query.scopeLen || 10

    if (typeof query.minimize === 'boolean' ? query.minimize : this.minimize) {
        var minimizeOptions = assign({}, query);

        [
            'removeComments',
            'collapseWhitespace',
            'collapseBooleanAttributes',
            'removeAttributeQuotes',
            'removeRedundantAttributes',
            'useShortDoctype',
            'removeEmptyAttributes',
            'removeOptionalTags'
        ].forEach(function (name) {
            if (typeof minimizeOptions[name] === 'undefined') {
                minimizeOptions[name] = true;
            }
        });

        content = htmlMinifier.minify(content, minimizeOptions);
    }

    var scope = createHash(content, scopeLen)
    var parseResults = parseHtml(content, scope)

    var links = parseResults.links
    var newHtml = JSON.stringify(parseResults.newHtml)

    var results = []

    if(links.length !== 0) {

        // 存在 link 标签
        links.forEach(function(link) {
            // var loader = ExtractTextPlugin.extract('style', 'css?!css-attr-scope?scope=' + scope + '!postcss?parser=postcss-scss').split('\\').join('\\\\')
            var loader = ExtractTextPlugin.extract('style', 'css?!css-attr-scope?scope=' + scope + '!postcss?parser=postcss-scss')


            if(process.platform.indexOf('win') !== -1) {
                loader = loader.replace(/\\/g, '////')
            }

            results.push(
                'require(\'!' + loader + '!' + link + '\');'
            )
        })
    }

    results.push(
        'module.exports = ' + newHtml + ';'
    )

    callback(null, results.join('\r\n'))
}

