garlic
======

a template engine

这个模板引擎的初衷，本来只是做一些简单的字符串替换的工作。

```
因为比较喜欢 nunjucks 的模板语法，但是一直会遇到一个奇怪的问题。
就是用 nunjucks.renderString 的时候，会 hold 住命令行很长时间，
（nunjucks.precompile 就没有问题）
模板已经渲染完毕，但是一直不能把控制权返回，有时候要等几十秒，
即便是一些简单的字符串替换都不行，跟执行次数也有关系。
总之，后来的解决方案是除了预编译的模板都用 underscore 模板来替换
```

后来遇到一些情况，就给取值表达式增加了filter的功能。  
2015年元旦期间，就想干脆试试扩展为一个完整的模板引擎好了。  
就是这样。  

目标：

1. 一定要支持预编译
2. 逐步完善，以nunjucks支持的语法为目标

目前支持（具体用法请参考 nunjucks 的语法）：

1. 表达式取值: `{{ name }} {{ item.addr }}`
2. filter: `{{ item.timestamp | formatTime }} {{ item.price | toInt | formatPrice('rmb') }}`
3. if/elif/else/endif: `{% if detail %}{{detail | nl2br}}{% else %}没有详情信息{% endif %}`
4. for/endfor: `{% for dog, name in dogs %} {{loop.index0}}. name: {{ name }} {% endfor %}`
5. set: `{% set name = dog.name %} {{ name }}, {{ dog.color }}`